import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'customerOrders',
  initialState: [],
  reducers: {
    upsertOrder: {
      reducer(state, action) {
        const order = state.find(
          ({ original_id }) => original_id === action.payload.original_id
        )
        if (!order) {
          state.push(action.payload)
        } else {
          order.id = action.payload.id
          Object.assign(order.roles, action.payload.roles)
          Object.assign(order.metadata, action.payload.metadata)
          Object.assign(order, action.payload)
        }
      },
    },
    updateOrder: {
      reducer(state, action) {
        const order = state.find(({ id }) => id === action.payload.id)
        if (order) {
          Object.assign(order, action.payload)
        } else {
          console.error(`Error cannot find token with id ${action.payload.id}`)
        }
      },
    },
  },
})

export const { actions, reducer } = ordersSlice

export const { upsertOrder, updateOrder } = actions

export default reducer
