import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
      <Grid item sm={12} md="auto">
        {[...customerOrders].reverse().map((order) => (
          <SummaryRow
            key={order.id}
            order={order}
            activeItem={selectedOrder && selectedOrder.id === order.id}
          />
        ))}
      </Grid>
      <Grid item sm={12} md="auto">
        {selectedOrder && <OrderSummary order={selectedOrder} />}
      </Grid>
    </Grid>
  )
}

export default MyOrders
