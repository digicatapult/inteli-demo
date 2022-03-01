export const AUTH_DOMAIN =
  process.env.REACT_APP_AUTH_DOMAIN ||
  Window.config.inteli.authDomain ||
  'inteli.eu.auth0.com'

export const AUTH_CLIENT_ID =
  process.env.REACT_APP_AUTH_CLIENT_ID ||
  Window.config.inteli.clientID ||
  'A5PgyCfBMIOhHQEIyImtqLGuD1VJ9VgP'

export const CUST_AUTH_CLIENT_ID =
  process.env.REACT_APP_CUST_AUTH_CLIENT_ID ||
  Window.config.inteli.custAuthClientID ||
  'BvJaBbxOce4Pwi5PZpjBTStvNWwzugPd'

export const T1_AUTH_CLIENT_ID =
  process.env.REACT_APP_T1_AUTH_CLIENT_ID ||
  Window.config.inteli.t1AuthClientID ||
  '6NfUcA48JdhKXYCc9yGTwM2m1gzcjOTU'

export const AUTH_AUDIENCE =
  process.env.REACT_APP_AUTH_AUDIENCE ||
  Window.config.inteli.authAudience ||
  'inteli-dev'

export const API_HOST =
  process.env.REACT_APP_API_HOST || Window.config.inteli.apiHost || 'localhost'

export const API_PORT =
  process.env.REACT_APP_API_PORT || Window.config.inteli.apiPort || 3000

export const SUBSTRATE_HOST =
  process.env.REACT_APP_SUBSTRATE_HOST || Window.config.inteli.substrateHost

export const SUBSTRATE_PORT =
  process.env.REACT_APP_SUBSTRATE_PORT || Window.config.inteli.substratePort

export const VITALAM_DEMO_PERSONA =
  process.env.REACT_APP_VITALAM_DEMO_PERSONA ||
  Window.config.inteli.vitalamDemoPersona
