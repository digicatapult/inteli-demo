import React, { useEffect } from 'react'
import {
  CardMedia,
  Container,
  Box,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'

import { markOrderRead } from '../../../features/readOrdersSlice'
import OrderStatus from './Status'
import AcceptOrderAction from './AcceptAction'
import RejectAction from './RejectAction'
import ManufactureOrderAction from './ManufactureAction'
import Attachment from '../Attachment'

const useStyles = makeStyles({
  root: {
    marginLeft: '32px',
    border: 'solid 2px #ccc',
  },
  row: {
    padding: '16px 0px',
    borderBottom: '1px lightgrey solid',
  },
  header: {
    padding: '16px 48px 12px 18px',
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

const EmptyAction = () => {
  return <></>
}

const OrderDetail = ({ order }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { partId, image, name, material, alloy } = order.orderDetails

  useEffect(() => {
    dispatch(markOrderRead(order.id))
  }, [order, dispatch])

  let Action = null
  switch (order.type) {
    case 'SubmittedOrder':
      Action = AcceptOrderAction
      break
    case 'AcceptedOrder':
      Action = ManufactureOrderAction
      break
    case 'ManufacturedOrder':
      Action = EmptyAction
      break
    case 'ManufacturingOrder':
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
            Order: {order.orderReference}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <OrderStatus orderStatus={order.type} />
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            alt={name}
            width="160"
            image={image}
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
                <DetailRow title="Quantity" value={1}></DetailRow>
                <DetailRow title="Material" value={material}></DetailRow>
                <DetailRow title="Alloy" value={alloy}></DetailRow>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <DetailRow
                  title="Customer name"
                  value={
                    order.CustomerDetails ? 'not empty' : 'no customer details'
                  }
                ></DetailRow>
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
          <Attachment name="Requirements.PDF" downloadData={null} />
          <Attachment name="CAD" downloadData={null} />
        </Box>
      </Grid>
      <Grid
        container
        alignItems="left"
        className={`${classes.row} ${classes.header}`}
      >
        <Grid item xs={6}>
          <Container
            className={`${classes.buttonWrapper} ${classes.rejectButton}`}
          >
            <RejectAction />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container className={classes.buttonWrapper}>
            <Action order={order} />
          </Container>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrderDetail
