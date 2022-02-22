const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_PORT = process.env.REACT_APP_API_PORT || '3001'

const toJSON = async (url) => {
  const response = await fetch(url)
  return response.json()
}

const wrappedFetch = (url, options) =>
  fetch(url, options).then((res) => res.json())

const useNewFetchWrapper = () => {
  const newWrappedFetch = async (url, options) => {
    let response = await fetch(url, options)

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
  return newWrappedFetch
}

const useApi = () => {
  const newWrappedFetch = useNewFetchWrapper()
  const authToken = localStorage.getItem('token')

  const runProcess = async (body) =>
    wrappedFetch(`http://${API_HOST}:${API_PORT}/v2/run-process`, {
      method: 'POST',
      mode: 'cors',
      body,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

  const latestToken = async () => {
    return wrappedFetch(`http://${API_HOST}:${API_PORT}/v2/last-token`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${authToken}`,
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
          Authorization: `Bearer ${authToken}`,
        },
      }
    )

    const metadata = await getNewMetadata(token)
    const isOrder = metadata.type === 'ORDER'
    const enrichedToken = {
      ...token,
      metadata: {
        ...metadata,
        requiredCerts:
          metadata.requiredCerts && isOrder
            ? await toJSON(metadata.requiredCerts.url)
            : undefined,
      },
    }

    return enrichedToken
  }

  const getNewMetadata = async (token) => {
    // recursive function?
    const metadata = {}
    await Promise.all(
      token.metadata_keys.map(async (metadata_key) => {
        metadata[metadata_key] = await newWrappedFetch(
          `http://${API_HOST}:${API_PORT}/v2/item/${token.id}/metadata/${metadata_key}`,
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
      })
    )
    return metadata
  }

  return { runProcess, latestToken, tokenById }
}

export default useApi
