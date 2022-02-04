import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Paper, Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'

import OrderStatus from './Status'
import { orderStatus } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    width: '100%',
    height: '32px',
    marginBottom: '8px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  rowItem: {
    display: 'grid',
    alignItems: 'center',
  },
  dotUnread: {
    color: theme.palette.highlight.main,
    paddingLeft: '8px',
  },
  dotOther: {
    display: 'hidden',
  },
}))

const OrderRow = (props) => {
  const {
    id: orderId,
    metadata: { name: orderName, status },
  } = props.order
  const classes = useStyles()
  const readOrders = useSelector((state) => state.readOrders)

  const isNewOrder =
    status === orderStatus.submitted && !readOrders.find((id) => id === orderId)

  return (
    <Paper
      component={RouterLink}
      to={`/app/orders/${orderId}`}
      elevation={0}
      className={classes.root}
    >
      <Grid container>
        <Grid
          item
          xs={1}
          className={`${isNewOrder ? classes.dotUnread : ''} ${
            classes.rowItem
          }`}
        >
          <Typography variant="h5">{isNewOrder ? '·' : '\xa0'}</Typography>
        </Grid>
        <Grid item xs={7} className={classes.rowItem}>
          <Typography>{orderName}</Typography>
        </Grid>
        <Grid item xs={4} className={`${classes.rowItem}`}>
          <OrderStatus status={status} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrderRow
