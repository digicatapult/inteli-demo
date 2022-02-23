import { createSlice } from '@reduxjs/toolkit'

// TODO rename
const tokens = createSlice({
  name: 'tokens',
  initialState: { lastFetchedToken: { id: 0 }, referenceToken: null },
  reducers: {
    add: (state, { payload }) => {
      const { type, ...data } = payload
      return {
        ...state,
        [type]: data,
      }
    },
    remove: (state, { payload }) => {
      return {
        ...state,
        [payload.type]: undefined,
      }
    },
  },
})

// exports
const { actions, reducer } = tokens
const { update, add, remove } = actions

export { update, add, remove }

export default reducer
