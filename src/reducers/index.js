import { combineReducers } from 'redux'
import customerPartsReducer from '../features/partsSlice'
import customerOrdersReducer from '../features/ordersSlice'
import readOrdersReducer from '../features/readOrdersSlice'
import readPowdersReducer from '../features/readPowdersSlice'
import readTestsReducer from '../features/readTestsSlice'
import powdersReducer from '../features/powdersSlice'
import labTestsReducer from '../features/labTestsSlice'
import networkStatusReducer from '../features/networkStatusSlice'

export default combineReducers({
  customerParts: customerPartsReducer,
  customerOrders: customerOrdersReducer,
  readOrders: readOrdersReducer,
  powders: powdersReducer,
  readPowders: readPowdersReducer,
  labTests: labTestsReducer,
  networkStatus: networkStatusReducer,
  readTests: readTestsReducer,
})
