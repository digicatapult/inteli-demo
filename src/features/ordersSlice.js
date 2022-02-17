import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'customerOrders',
  initialState: [],
  reducers: {
    resetOrder: {
      reducer() {
        return []
      },
    },
    upsertOrder: {
      reducer(state, action) {
        const order = state.find(
          ({ original_id }) => original_id === action.payload.original_id
        )
        // tokens for new assets have matching id and original_id
        if (action.payload.id === action.payload.original_id && !order) {
          state.push(action.payload)
        } else {
          if (order) {
            Object.assign(order, action.payload)
          } else {
            console.error(
              `Error cannot find order with original id ${action.payload.original_id}`
            )
          }
        }
      },
    },
  },
})

export const { actions, reducer } = ordersSlice

export const { upsertOrder, resetOrder } = actions

export default reducer
