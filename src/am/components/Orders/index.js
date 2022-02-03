import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import SearchField from './SearchField'
import OrderRow from './Row'
import OrderDetail from './Detail'
import Header from '../Header'

const Orders = () => {
  const params = useParams()
  const customerOrders = useSelector((state) => state.customerOrders)

  const selectedOrder = params.orderId
    ? customerOrders.find(({ id }) => `${id}` === params.orderId)
    : null

  return (
    <Box>
      <Header title="Orders" />
      <Grid container direction="row">
        <Grid container direction="column" item xs={5}>
          <SearchField />
          {[...customerOrders].reverse().map((order) => (
            <OrderRow key={order.original_id} order={order} />
          ))}
        </Grid>
        <Grid item xs={7}>
          {selectedOrder ? <OrderDetail order={selectedOrder} /> : null}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Orders
