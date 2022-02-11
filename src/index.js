import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, applyMiddleware } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'

import CustomerApp from './customer'
import AdditiveManufacturerApp from './am'
import LaboratoryApp from './laboratory'
import rootReducer from './reducers'
import BlockchainWatcher from './shared/BlockchainWatcher.js'
import { loadAppState } from './features/appSlice'
import auth from './redux-middleware/auth'


// TODO move to sep file
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middlewareEnhancer: composeWithDevTools(
        applyMiddleware(auth),
    ),
})

store.dispatch(loadAppState())

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
