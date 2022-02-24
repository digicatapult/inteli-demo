import { createSlice } from '@reduxjs/toolkit'

export const labTestsSlice = createSlice({
  name: 'labTests',
  initialState: [],
  reducers: {
    resetLabTest: {
      reducer() {
        return []
      },
    },
    upsertLabTest: {
      reducer(state, action) {
        const labTest = state.find(
          ({ original_id }) => original_id === action.payload.original_id
        )
        // tokens for new assets have matching id and original_id
        if (action.payload.id === action.payload.original_id && !labTest) {
          state.push(action.payload)
        } else {
          if (labTest) {
            labTest.id = action.payload.id
            Object.assign(labTest.roles, action.payload.roles)
            Object.assign(labTest.metadata, action.payload.metadata)
          } else {
            console.error(
              `Error cannot find lab test with original id ${action.payload.original_id}`
            )
          }
        }
      },
    },
  },
})

export const { actions, reducer } = labTestsSlice

export const { upsertLabTest, resetLabTest } = actions

export default reducer
