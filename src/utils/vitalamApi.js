import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { updateNetworkStatus } from '../features/networkStatusSlice'

const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_PORT = process.env.REACT_APP_API_PORT || '3001'

const useFetchWrapper = () => {
  const dispatch = useDispatch()

  const wrappedFetch = async (url, options) => {
    let request
    try {
      request = await fetch(url, options)
      if (request.ok) {
        dispatch(updateNetworkStatus(true))
      } else {
        dispatch(updateNetworkStatus(false))
      }
    } catch (err) {
      dispatch(updateNetworkStatus(false))
      throw err
    }
    return request.json()
  }

  return wrappedFetch
}

const useNewFetchWrapper = () => {
  const dispatch = useDispatch()

  const newWrappedFetch = async (url, options) => {
    let request
    try {
      request = await fetch(url, options)
      if (request.ok) {
        dispatch(updateNetworkStatus(true))
      } else {
        dispatch(updateNetworkStatus(false))
      }
    } catch (err) {
      dispatch(updateNetworkStatus(false))
      throw err
    }

    if (
      request.headers.get('content-type') === 'application/json; charset=utf-8'
    ) {
      return request.json()
    } else if (
      request.headers.get('content-type') === 'text/plain; charset=utf-8'
    ) {
      return request.text()
    } else {
      const file = await request.blob()
      const a = request.headers.get('content-disposition')
      console.log(a)
      const filename = request.headers
        .get('content-disposition')
        .split('filename=')[1]
        .replace(/['"]/g, '')

      return {
        url: URL.createObjectURL(file),
        name: filename,
      }
    }
  }
  return newWrappedFetch
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
  const newWrappedFetch = useNewFetchWrapper()

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
    console.log(token)
    // temporary catch old style metadata
    if (!token.metadata_keys.includes('')) {
      await getNewMetadata(token)
    } else {
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
