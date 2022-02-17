import React, { useEffect } from 'react'
import { CardMedia, Box, Grid, Paper, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'

import { markOrderRead } from '../../../features/readOrdersSlice'
import { orderStatus } from '../../../utils'
import OrderStatus from './Status'
import AcceptOrderAction from './AcceptAction'
import ManufactureOrderAction from './ManufactureAction'
import Attachment from '../Attachment'
import Negotiate from './Negotiate'
import Certification from './Certification'

const useStyles = makeStyles({
  root: {
    marginLeft: '32px',
  },
  row: {
    padding: '16px 0px',
  },
  acceptRow: {
    padding: '16px 0px',
  },
  header: {
    padding: '24px 28px',
    '& h6': {
      marginRight: 'auto',
    },
  },
  orderDetailsHeading: {
    fontWeight: 600,
  },
  content: {
    position: 'relative',
  },
  inline: {
    display: 'inline',
  },
  attachment: {
    width: '100%',
  },
  contentForm: {
    margin: '0px 64px 0px -8px',
    padding: '0px',
  },
  rightColumn: {
    padding: '64px 0px 112px 16px',
  },
  rightColumnBottom: {
    marginTop: '96px',
  },
  partTitle: {
    fontWeight: '600',
    marginBottom: '32px',
  },
  shippingAddress: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  errorText: {
    color: '#ff0000',
    fontSize: '1rem',
    margin: '8px 0px',
  },
})

const DetailRow = ({ title, value }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.inline} variant="subtitle2">
        {title}:
      </Typography>
      &nbsp;
      <Typography
        className={classes.inline}
        variant="subtitle1"
        color="textSecondary"
      >
        {value}
      </Typography>
    </Box>
  )
}

const getTotalCost = (price, quantity) => {
  let cost = '0.00'

  if (price && quantity) {
    cost = price * quantity
    cost = `${cost}.00`
  }

  return cost
}

const OrderDetail = ({ order }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    metadata: {
      partId,
      orderImage,
      name,
      material,
      alloy,
      price,
      quantity: quantityOnChain,
      type,
      status,
      orderReference,
      requiredCerts,
    },
  } = order

  useEffect(() => {
    dispatch(markOrderRead(order.id))
  }, [order, dispatch])

  const EmptyAction = () => {
    return <></>
  }

  let Action = null
  switch (status) {
    case orderStatus.submitted:
      Action = AcceptOrderAction
      break
    case orderStatus.accepted:
      Action = ManufactureOrderAction
      break
    case orderStatus.amended:
    case orderStatus.manufacturing:
    case orderStatus.manufactured:
      Action = EmptyAction
      break
    default:
      Action = EmptyAction
      break
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid
        container
        alignItems="center"
        className={`${classes.row} ${classes.header}`}
      >
        <Grid item xs={9}>
          <Typography variant="h6" component="h6">
            Order: {orderReference}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <OrderStatus orderStatus={type} />
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            alt={name}
            width="160"
            image={orderImage.url}
            title={name}
          />
        </Grid>
        <Grid container item xs={9}>
          <Typography
            gutterBottom
            variant="body1"
            className={classes.orderDetailsHeading}
          >
            Order Details
          </Typography>
          <Grid container>
            <Grid item xs={6} className={classes.content}>
              <Box>
                <DetailRow title="Part name" value={name}></DetailRow>
                <DetailRow title="Part Number" value={partId}></DetailRow>
                <DetailRow title="Quantity" value={quantityOnChain}></DetailRow>
                <DetailRow title="Material" value={material}></DetailRow>
                <DetailRow title="Alloy" value={alloy}></DetailRow>
                <DetailRow
                  title="Delivery By"
                  value={order.metadata.deliveryBy}
                ></DetailRow>
                <DetailRow title="Unit Price" value={price}></DetailRow>
                <DetailRow
                  title="Total Cost"
                  value={getTotalCost(price, quantityOnChain)}
                ></DetailRow>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography variant="subtitle2">Shipping Address:</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Digital Catapult
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  101 Euston Road
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  London
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  NW1 2RA
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        className={`${classes.row} ${classes.header}`}
      >
        <Box className={classes.attachment}>
          <DetailRow title="Attached Documents"></DetailRow>
          <Attachment name="Requirements.PDF" />
          <Attachment name="CAD" />
        </Box>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Action order={order} />
        </Grid>
      </Grid>
      {status === orderStatus.submitted && <Negotiate order={order} />}
      {requiredCerts &&
        [
          orderStatus.accepted,
          orderStatus.manufacturing,
          orderStatus.manufactured,
        ].includes(status) && <Certification order={order} />}
    </Paper>
  )
}

export default OrderDetail
