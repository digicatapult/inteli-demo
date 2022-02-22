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

        // tokens for new assets have matching id and original_id
        if (action.payload.id === action.payload.original_id && !order) {
          action.payload.statusHistory = buildStatusHistory({}, action.payload)
          state.push(action.payload)
        } else {
          if (order) {
            order.id = action.payload.id
            Object.assign(order.roles, action.payload.roles)
            Object.assign(order.metadata, action.payload.metadata)

            order.statusHistory = buildStatusHistory(
              order.statusHistory,
              action.payload
            )

            if (action.payload.timestamp) {
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

const buildStatusHistory = (statusHistory, payload) => {
  const newStatus = payload.metadata.status
  const timestamp = payload.timestamp
  if (newStatus && timestamp) {
    return {
      ...statusHistory,
      [newStatus]: timestamp,
    }
  } else {
    return statusHistory
  }
}

export const { actions, reducer } = ordersSlice

export const { upsertOrder } = actions

export default reducer
