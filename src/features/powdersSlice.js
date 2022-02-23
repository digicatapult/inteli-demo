import { createSlice } from '@reduxjs/toolkit'

export const powdersSlice = createSlice({
  name: 'powders',
  initialState: [],
  reducers: {
    resetPowder: {
      reducer() {
        return []
      },
    },
    upsertPowder: {
      reducer(state, action) {
        const powder = state.find(
          ({ original_id }) => original_id === action.payload.original_id
        )
        // tokens for new assets have matching id and original_id
        if (action.payload.id === action.payload.original_id && !powder) {
          state.push(action.payload)
        } else {
          if (powder) {
            powder.id = action.payload.id
            Object.assign(powder.roles, action.payload.roles)
            Object.assign(powder.metadata, action.payload.metadata)
          } else {
            console.error(
              `Error cannot find powder with original id ${action.payload.original_id}`
            )
          }
        }
      },
    },
  },
})

export const { actions, reducer } = powdersSlice

export const { upsertPowder, resetPowder } = actions

export default reducer
