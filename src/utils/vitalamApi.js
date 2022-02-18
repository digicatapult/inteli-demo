import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { updateNetworkStatus } from '../features/networkStatusSlice'

const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_PORT = process.env.REACT_APP_API_PORT || '3001'

const useFetchWrapper = () => {
  const dispatch = useDispatch()

  const wrappedFetch = async (url, options) => {
    let response
    try {
      response = await fetch(url, options)
      if (response.ok) {
        dispatch(updateNetworkStatus(true))
      } else {
        dispatch(updateNetworkStatus(false))
      }
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
        const appBlob = new Blob([blob], { type: 'application' })
        const url = URL.createObjectURL(appBlob)
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
  return wrappedFetch
}

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
  const wrappedFetch = useFetchWrapper()

  const getAuthToken = async () => {
    let token = localStorage.getItem('token')

    if (!checkJwt(token)) {
      localStorage.clear('token')
      const response = await wrappedFetch(
        `http://${API_HOST}:${API_PORT}/v2/auth`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
            client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
          }),
        }
      )

      token = response.access_token
      localStorage.setItem('token', token)
    }
    return token
  }

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
    return await wrappedFetch(`http://${API_HOST}:${API_PORT}/v2/last-token`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    })
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

    return {
      ...token,
      metadata: await getMetadata(token.id, token.metadata_keys),
    }
  }

  const getMetadata = async (id, metadataKeys) => {
    return Object.assign(
      {},
      ...(await Promise.all(
        metadataKeys.map(async (metadataKey) => {
          return {
            [metadataKey]: await getMetadataValue(id, metadataKey),
          }
        })
      ))
    )
  }

  const getMetadataValue = async (id, metadataKey) => {
    return await wrappedFetch(
      `http://${API_HOST}:${API_PORT}/v2/item/${id}/metadata/${metadataKey}`,
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

  return { runProcess, latestToken, tokenById }
}

export default useApi
