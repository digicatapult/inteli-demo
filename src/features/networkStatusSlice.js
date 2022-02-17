import { createSlice } from '@reduxjs/toolkit'

export const networkStatusSlice = createSlice({
  name: 'networkStatus',
  initialState: true,
  reducers: {
    updateNetworkStatus: {
      reducer: (state, action) => action.payload,
    },
  },
})

export const { actions, reducer } = networkStatusSlice

export const { updateNetworkStatus } = actions

export default reducer
