import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'
import { Auth0Provider } from '@auth0/auth0-react'
import { getCurrentBaseUrl } from './utils/url'
import { saveState, loadState } from './utils/localStorage'

import {
  AUTH_AUDIENCE,
  CUST_AUTH_CLIENT_ID,
  T1_AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  INTELI_DEMO_PERSONA,
} from './utils/env.js'

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState('app'),
})

store.subscribe(() => {
  saveState(store.getState(), 'app')
})

let App = null
let props = {}
let authClientID,
  redirectPath = ''
switch (INTELI_DEMO_PERSONA) {
  case 'cust':
    App = CustomerApp
    document.title = 'BAE Systems | Customer'
    authClientID = CUST_AUTH_CLIENT_ID
    redirectPath = '/app/customer-parts'
    break
  case 'am':
    App = AdditiveManufacturerApp
    document.title = 'Maher | AM'
    authClientID = T1_AUTH_CLIENT_ID
    redirectPath = '/app/orders'
    break
  default:
    throw new Error('Invalid persona for demo')
}

ReactDOM.render(
  <Auth0Provider
    domain={AUTH_DOMAIN}
    clientId={authClientID}
    redirectUri={`${getCurrentBaseUrl()}${redirectPath}`}
    audience={AUTH_AUDIENCE}
    scope=""
  >
    <Provider store={store}>
      <BlockchainWatcher>
        <App {...props} />
      </BlockchainWatcher>
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
)
