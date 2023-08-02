import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'
import { saveState, loadState } from './utils/localStorage'

import { INTELI_DEMO_PERSONA } from './utils/env.js'

const initialState = loadState('app')
const initialLatestToken = Math.max(
  0,
  ...(initialState?.customerOrders
    ?.map((order) => order?.id)
    ?.filter((id) => !!id) || [])
)

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})

store.subscribe(() => {
  saveState(store.getState(), 'app')
})

let App = null
let props = {}
switch (INTELI_DEMO_PERSONA) {
  case 'cust':
    App = CustomerApp
    document.title = 'BAE Systems | Customer'
    break
  case 'am':
    App = AdditiveManufacturerApp
    document.title = 'Maher | AM'
    break
  default:
    throw new Error('Invalid persona for demo')
}

ReactDOM.render(
  <Provider store={store}>
    <BlockchainWatcher latestToken={initialLatestToken}>
      <App {...props} />
    </BlockchainWatcher>
  </Provider>,
  document.getElementById('root')
)
