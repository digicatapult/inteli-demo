import { createSlice } from '@reduxjs/toolkit'

export const powdersSlice = createSlice({
  name: 'powders',
  initialState: [],
  reducers: {
    upsertPowder: {
      reducer(state, action) {
        const powder = state.find(
          ({ original_id }) => original_id === action.payload.original_id
        )
        if (!powder) {
          state.push(action.payload)
        } else {
          powder.id = action.payload.id
          Object.assign(powder.roles, action.payload.roles)
          Object.assign(powder.metadata, action.payload.metadata)
        }
      },
    },
  },
})

export const { actions, reducer } = powdersSlice

export const { upsertPowder } = actions

export default reducer
