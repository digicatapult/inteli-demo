import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

import SummaryRow from './SummaryRow'
import OrderSummary from './OrderSummary'
import Spacer from '../../shared/Spacer'

const getSelectedOrder = (orders, paramsId) => {
  if (orders.length > 0) {
    return paramsId
      ? orders.find(({ id }) => `${id}` === paramsId)
      : orders[orders.length - 1]
  } else {
    return null
  }
}

// A temporary solution for generating a seeded pseudo random
// with min and max values, max = max - min (which is not handled)
const getForecastDate = (timestamp, max = 12, min = 3) => {
  let unix = moment(timestamp).unix()
  const n = Math.sin(unix++) * 10000

  return moment(timestamp)
    .add(parseInt((n - Math.floor(n)) * max) + min, 'days')
    .format('DD MMM YYYY')
}

const MyOrders = () => {
  const params = useParams()
  const navigate = useNavigate()

  //This is where the ID from a previously selected item is stored
  const customerOrders = useSelector((state) => state.customerOrders)
  const selectedOrder = getSelectedOrder(customerOrders, params.orderId)

  useEffect(() => {
    if (selectedOrder) {
      navigate({
        pathname: `/app/my-orders/${selectedOrder.id}`,
      })
    }
  }, [navigate, selectedOrder])

  return (
    <Grid container>
      <Spacer height={5} />
      <Grid item sm={12} md={3}>
        {[...customerOrders].reverse().map((order) => {
          const forecastDate = getForecastDate(order.timestamp)
          return (
            <SummaryRow
              key={order.id}
              order={{
                forecastDate,
                ...order,
              }}
              activeItem={selectedOrder && selectedOrder.id === order.id}
            />
          )
        })}
      </Grid>
      <Grid item sm={12} md={9}>
        {selectedOrder && <OrderSummary order={selectedOrder} />}
      </Grid>
    </Grid>
  )
}

export default MyOrders
