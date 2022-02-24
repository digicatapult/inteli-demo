import jwtDecode from 'jwt-decode'

const {
  REACT_APP_API_HOST,
  REACT_APP_API_PORT,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH_CLIENT_SECRET,
} = process.env
const url = `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}/v2/auth`
const authReqParams = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: REACT_APP_AUTH_CLIENT_ID,
    client_secret: REACT_APP_AUTH_CLIENT_SECRET,
  }),
}

const isTokenValid = () => {
  const token = localStorage.getItem('token')
  if (!token || token === 'undefined') return false
  return jwtDecode(token).exp * 1000 > Date.now()
}

const auth = () => (next) => (action) => {
  try {
    if (isTokenValid()) return next(action)
    localStorage.clear('token')

    fetch(url, authReqParams)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.access_token)
        return next(action)
      })
  } catch (e) {
    localStorage.clear('token')
    console.error('invalid token, not returning next action', e)
  }
}

export default auth
