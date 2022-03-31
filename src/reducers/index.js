import { combineReducers } from 'redux'
import customerPartsReducer from '../features/partsSlice'
import customerOrdersReducer from '../features/ordersSlice'
import readOrdersReducer from '../features/readOrdersSlice'
import networkStatusReducer from '../features/networkStatusSlice'

export default combineReducers({
  customerParts: customerPartsReducer,
  customerOrders: customerOrdersReducer,
  readOrders: readOrdersReducer,
  networkStatus: networkStatusReducer,
})
