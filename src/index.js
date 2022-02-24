import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// this seems a little overkill to render a different app rather than render different components, we should focus on re-useable components
import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import LaboratoryApp from './laboratory'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'
import auth from './redux-middleware/auth'
import { loadState, saveState } from './utils/localStorage'

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(auth),
})

store.subscribe(() => {
  const state = store.getState()
  saveState(state)
})

let App = null
let props = {}
switch (process.env.REACT_APP_VITALAM_DEMO_PERSONA) {
  case 'cust':
    App = CustomerApp
    document.title = 'BAE Systems | Customer'
    break
  case 'am':
    App = AdditiveManufacturerApp
    document.title = 'Maher | AM'
    break
  case 'lab':
    App = LaboratoryApp
    document.title = 'TruFORM | Lab'
    props = { labType: 'lab' }
    break
  case 'amlab':
    App = LaboratoryApp
    document.title = 'Aero | Lab'
    props = { labType: 'amlab' }
    break
  default:
    throw new Error('Invalid persona for VitalAM demo')
}

ReactDOM.render(
  <Provider store={store}>
    <BlockchainWatcher>
      <App {...props} />
    </BlockchainWatcher>
  </Provider>,
  document.getElementById('root')
)
