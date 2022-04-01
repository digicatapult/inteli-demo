import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'customerOrders',
  initialState: [],
  reducers: {
    updateOrderImage: {
      reducer(state, { payload }) {
        const order = state.find(
          ({ original_id }) => original_id === payload.original_id
        )
        order.metadata.orderImage = payload.orderImage
      },
    },
    upsertOrder: {
      reducer(state, action) {
        const order = state.find(
          ({ original_id }) => original_id === action.payload.original_id
        )

        // tokens for new assets have matching id and original_id
        if (action.payload.id === action.payload.original_id && !order) {
          action.payload.history = metadataHistory([], action.payload)
          state.push(action.payload)
        } else {
          if (order) {
            order.id = action.payload.id
            Object.assign(order.roles, action.payload.roles)
            Object.assign(order.metadata, action.payload.metadata)

            if (action.payload.timestamp) {
              order.history = metadataHistory(order.history, action.payload)
              order.timestamp = action.payload.timestamp
            }
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

const metadataHistory = (history = [], payload) => {
  return payload.timestamp
    ? [
        { timestamp: payload.timestamp, metadata: payload.metadata }, // most recent first
        ...history,
      ]
    : history
}

export const { actions, reducer } = ordersSlice

export const { upsertOrder, updateOrderImage } = actions

export default reducer
