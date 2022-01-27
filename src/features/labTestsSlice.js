import { createSlice } from '@reduxjs/toolkit'

export const labTestsSlice = createSlice({
  name: 'labTests',
  initialState: [],
  reducers: {
    upsertLabTest: {
      reducer(state, action) {
        // tokens for new assets have matching id and original_id
        const labTest = state.find(
          ({ id }) => id === action.payload.original_id
        )
        if (action.payload.id === action.payload.original_id) {
          if (!labTest) {
            state.push(action.payload)
          }
        } else {
          if (labTest) {
            Object.assign(labTest, action.payload)
          } else {
            console.error(
              `Error cannot find token with id ${action.payload.original_id}`
            )
          }
        }
      },
    },
  },
})

export const { actions, reducer } = labTestsSlice

export const { upsertLabTest } = actions

export default reducer
