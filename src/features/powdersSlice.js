import { createSlice } from '@reduxjs/toolkit'

export const powdersSlice = createSlice({
  name: 'powders',
  initialState: [],
  reducers: {
    upsertPowder: {
      reducer(state, action) {
        const powder = state.find(({ id }) => id === action.payload.original_id)
        if (!powder) {
          state.push(action.payload)
        } else {
          Object.assign(powder, action.payload)
        }
      },
    },
  },
})

export const { actions, reducer } = powdersSlice

export const { upsertPowder } = actions

export default reducer
