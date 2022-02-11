import { useDispatch } from 'react-redux'
// import jwtDecode from 'jwt-decode'
import { updateNetworkStatus } from '../features/networkStatusSlice'

const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_PORT = process.env.REACT_APP_API_PORT || '3001'

const wrappedFetch = (url, options) =>
    fetch(url, options).then((res) => res.json())

const useNewFetchWrapper = () => {
    const dispatch = useDispatch()
    const newWrappedFetch = async (url, options) => {
        let response
        try {
            response = await fetch(url, options)
            dispatch(updateNetworkStatus(response.ok))
        } catch (err) {
            dispatch(updateNetworkStatus(false))
            throw err
        }

        const contentType = response.headers.get('content-type')
        switch (contentType) {
            case 'application/json; charset=utf-8':
                return response.json()
            case 'text/plain; charset=utf-8':
                return response.text()
            case 'application/octet-stream': {
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                const fileName = response.headers
                    .get('content-disposition')
                    .split('filename=')[1]
                    .replace(/['"]/g, '')

                return {
                    url: url,
                    fileName: fileName,
                }
            }
            default:
                return response.json()
        }
    }
    return newWrappedFetch
}

// TODO: convert into a middleware - matt?
// e.g. for all routes ../v2*
const checkJwt = (token) => {
    if (!token) return false
    try {
        const decoded = jwtDecode(token)
        const hasExpired = decoded.exp * 1000 < Date.now()
        return !hasExpired
    } catch (err) {
        return false
    }
}

const useApi = () => {
    const newWrappedFetch = useNewFetchWrapper()

    const runProcess = async (body) =>
        wrappedFetch(`http://${API_HOST}:${API_PORT}/v2/run-process`, {
            method: 'POST',
            mode: 'cors',
            body,
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            },
        })

    const latestToken = async () => {
        return await wrappedFetch(
            `http://${API_HOST}:${API_PORT}/v2/last-token`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    Authorization: `Bearer ${await getAuthToken()}`,
                },
            }
        )
    }
    const tokenById = async (id) => {
        const token = await wrappedFetch(
            `http://${API_HOST}:${API_PORT}/v2/item/${id}`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    Authorization: `Bearer ${await getAuthToken()}`,
                },
            }
        )
        // temporary catch old style metadata
        if (token.metadata_keys.includes('')) {
            token.metadata = await wrappedFetch(
                `http://${API_HOST}:${API_PORT}/v2/item/${id}/metadata`,
                {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        Authorization: `Bearer ${await getAuthToken()}`,
                    },
                }
            )
        } else {
            await getNewMetadata(token)
        }

        return token
    }

    const getNewMetadata = async (token) => {
        await Promise.all(
            token.metadata_keys.map(async (metadata_key) => {
                token.metadata[metadata_key] = await newWrappedFetch(
                    `http://${API_HOST}:${API_PORT}/v2/item/${token.id}/metadata/${metadata_key}`,
                    {
                        method: 'GET',
                        mode: 'cors',
                        cache: 'no-cache',
                        headers: {
                            Authorization: `Bearer ${await getAuthToken()}`,
                        },
                    }
                )
            })
        )
        return token
    }

    return { runProcess, latestToken, tokenById }
}

export default useApi
