import React from 'react'
import { Paper, Typography, Grid, Box, CardMedia } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import TimelineOrder from './TimelineOrder'

const useStyles = makeStyles({
  name: {
    marginBottom: '20px',
  },
  details: {
    marginRight: 24,
  },
  root: {
    marginLeft: '32px',
  },
  row: {
    padding: '16px 0px 70px 0px',
    borderBottom: '1px lightgrey solid',
  },
  inline: {
    display: 'inline',
  },
  orderDetailsHeading: {
    fontWeight: 600,
    paddingBottom: '50px',
  },
  addressMargin: {
    marginTop: '85px',
  },
  header: {
    padding: '16px 48px 12px 18px',
    '& h6': {
      marginRight: 'auto',
    },
  },
  maherStyle: {
    backgroundColor: '#0C74BB',
    color: '#ffff',
    padding: '5px',
    marginTop: '30px',
    border: ' 1px solid 0C74BB',
    borderRadius: '3px',
    marginRight: '20px',
  },
  leftPadding: {
    paddingLeft: '60px',
    marginBottom: '20px',
  },
  columnTwoPadding: {
    paddingLeft: '40px',
  },
  pricePadding: {
    paddingBottom: '25px',
  },
  picturePadding: {
    paddingLeft: '10px',
  },
  orderStatus: {
    paddingTop: '30px',
  },
  shippingPadding: {
    paddingBottom: '10px',
  },
  sevenHunFont: {
    fontWeight: '700',
  },
})

// Helpers -------------------------------------

// Formats a row that contains 2 items, for example 'Quantity: 1'
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

// Calculates the base cose
const getTotalCost = (price, quantity) => {
  let cost = '0'
  if (price && quantity) {
    cost = price * quantity
    cost = `${cost}`
  }
  return cost
}

// Formats the cost into £000,000,000.00
const formatCost = (cost) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(cost)
}

// End of Helpers -------------------------------------

const OrderSummary = ({ order }) => {
  const classes = useStyles()
  const {
    id: orderId,
    metadata: {
      name,
      orderImage: image,
      alloy,
      material,
      partId,
      price,
      quantity,
    },
  } = order

  return (
    <Paper id={orderId} className={classes.root} elevation={0} xs={12}>
      <Grid container className={classes.row}>
        <Grid item xs={2}>
          <CardMedia
            component="img"
            alt={image.filename}
            width="160"
            height="160px"
            image={image.url}
            title={image.filename}
            className={classes.picturePadding}
          />
        </Grid>
        <Grid container item xs={4} className={classes.columnTwoPadding}>
          <Typography
            gutterBottom
            variant="h6"
            className={classes.orderDetailsHeading}
          >
            {name}
          </Typography>
          <Grid container>
            <Grid item className={classes.content}>
              <DetailRow title="Part name" value={name}></DetailRow>
              <DetailRow title="Part Number" value={partId}></DetailRow>
              <DetailRow title="Quantity" value={quantity}></DetailRow>
              <DetailRow title="Material" value={material}></DetailRow>
              <DetailRow title="Alloy" value={alloy}></DetailRow>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box className={classes.addressMargin}>
            <Typography variant="subtitle2" className={classes.shippingPadding}>
              Shipping Address:
            </Typography>
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
        <Grid item xs={2}>
          <div className={classes.addressMargin}>
            <div className={classes.pricePadding}>
              <Typography
                variant="subtitle2"
                className={`${classes.shippingPadding} ${classes.sevenHunFont}`}
              >
                Quantity: {quantity}
              </Typography>
              <Typography variant="subtitle2" className={classes.sevenHunFont}>
                Price: {formatCost(getTotalCost(price, quantity))}
              </Typography>
            </div>
            <Typography
              variant="subtitle2"
              component="h6"
              display="inline"
              className={classes.maherStyle}
            >
              MAHER
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Grid item>
        <Typography
          style={{ color: '#494E56' }}
          className={`${classes.leftPadding} ${classes.orderStatus}`}
          variant="h5"
        >
          Order Status
        </Typography>
        <Grid container>
          <Grid item xs={11}>
            <TimelineOrder order={order} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrderSummary
