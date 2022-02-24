import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import LaboratoryApp from './laboratory'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'
// as agreed this will be part of another PR, doing in stages
// 1. blockchainwatcher back to timeout
// 2. localstorage implementation
// 3. setting lastFetchedToken
// 4. ability to reset invalidate token after the 'ref' point
//import { loadState, saveState } from './utils/localStorage'
/* please read above ^^^ 
  // preloadedState: loadState(),
store.subscribe(() => { 
  const state = store.getState()
  saveState(state)
})
*/

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',

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
