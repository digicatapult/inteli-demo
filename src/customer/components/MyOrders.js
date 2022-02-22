import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SummaryRow from './SummaryRow'
import OrderSummary from './OrderSummary'

const useStyles = makeStyles((theme) => ({
  backButton: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  order: {
    width: '100%',
    border: 'solid #ccc 1px',
    paddingTop: '20px',
    marginBottom: '8px',
  },
  detailText: {
    display: 'inline',
  },
  name: {
    marginBottom: '20px',
  },
  mainPadding: {
    paddingTop: '130px',
  },
  leftColumn: {
    width: '390px',
  },
  rightColumn: {
    width: '1146px',
    borderRadius: '8px',
  },
  maherStyle: {
    backgroundColor: '#0C74BB',
    color: '#ffff',
    padding: '5px',
    border: ' 1px solid 0C74BB',
    borderRadius: '3px',
    marginRight: '20px',
  },
  listPadding: {
    marginBottom: '10px',
  },
  listItemMargin: {
    marginBottom: '60px',
  },
  datePadding: {
    paddingLeft: '80px',
  },
  containerWidth: {
    width: '1546px',
  },
  active: {
    background: 'green',
  },
  notActive: {
    background: 'red',
  },
}))

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

  const classes = useStyles()

  useEffect(() => {
    if (selectedOrder) {
      navigate({
        pathname: `/app/my-orders/${selectedOrder.id}`,
      })
    }
  }, [navigate, selectedOrder])

  return (
    <Grid container className={classes.containerWidth}>
      <Grid item className={classes.leftColumn}>
        {[...customerOrders].reverse().map((order) => (
          <SummaryRow
            key={order.id}
            order={order}
            activeItem={selectedOrder && selectedOrder.id === order.id}
          />
        ))}
      </Grid>
      <Grid item className={classes.rightColumn}>
        {selectedOrder && <OrderSummary order={selectedOrder} />}
      </Grid>
    </Grid>
  )
}

export default MyOrders
