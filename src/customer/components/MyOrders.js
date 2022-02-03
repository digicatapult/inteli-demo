import React from 'react'
import {
  Paper,
  Grid,
  CardMedia,
  Typography,
  Box,
  Container,
} from '@material-ui/core'
import BackButton from './BackButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useSelector } from 'react-redux'
import OrderStatusProgressBar from './OrderStatusProgressBar'
import OrderSummary from './OrderComponents/OrderSummary'
import SummaryRow from './OrderComponents/summaryRow'

const useStyles = makeStyles((theme) => ({
  backButton: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  order: {
    width: '100%',
    border: 'solid #ccc 1px',
    padding: '20px 20px 20px 0px',
    marginBottom: '8px',
  },
  detailText: {
    display: 'inline',
  },
  name: {
    marginBottom: '20px',
  },
  details: {
    // marginRight: 24,
  },
}))

const DetailRow = ({ title, value }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.detailText} variant="body1">
        {title}:
      </Typography>
      &nbsp;
      <Typography
        className={classes.detailText}
        variant="body2"
        color="textSecondary"
      >
        {value}
      </Typography>
    </Box>
  )
}

const MyOrders = () => {
  const customerOrders = useSelector((state) => state.customerOrders)
  const classes = useStyles()

  return (
    <Container>
      <BackButton
        buttonClass={classes.backButton}
        backToLocation="/app/customer-parts"
        value="< Test"
      />
      <Container>
        {customerOrders.length ? (
          [...customerOrders].reverse().map((order) => {
            const { image, name, partId, material, alloy } = order.orderDetails

            return (
              <div key={'container'}>
                <Grid container direction="row">
                  <Grid container direction="column" item xs={3}>
                    <SummaryRow
                      image={image}
                      alloy={alloy}
                      material={material}
                      partName={name}
                      partNumber={order.partId}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <OrderSummary
                      image={image}
                      alloy={alloy}
                      material={material}
                      partName={name}
                      partNumber={order.partId}
                    />
                  </Grid>
                </Grid>

                <Paper
                  elevation={0}
                  key={order.orderReference}
                  className={classes.order}
                >
                  <Grid container item direction="row" alignItems="center">
                    <Grid item xs={2}>
                      <CardMedia
                        component="img"
                        alt={name}
                        image={image}
                        title={name}
                      />
                    </Grid>
                    <Grid item xs={2} className={classes.details}>
                      <Typography variant="h6" className={classes.name}>
                        {name}
                      </Typography>
                      <DetailRow title="Part Number" value={partId} />
                      <DetailRow title="Material" value={material} />
                      <DetailRow title="Alloy" value={alloy} />
                    </Grid>
                    <Grid item>
                      <OrderStatusProgressBar
                        orderType={order.type}
                        orderPowderId={order.powderId}
                      />
                    </Grid>
                  </Grid>
                </Paper>

                <Grid container item>
                  <Grid item xs={1}>
                    <CardMedia
                      component="img"
                      alt={name}
                      image={image}
                      title={name}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.details}>
                    <Typography variant="h6" className={classes.name}>
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <OrderSummary
                      image={image}
                      alloy={alloy}
                      material={material}
                      partName={name}
                      partNumber={order.partId}
                    />
                  </Grid>
                </Grid>
              </div>
            )
          })
        ) : (
          <Grid container direction="row" justify="center">
            {'There are no orders'}
          </Grid>
        )}
      </Container>
    </Container>
  )
}

export default MyOrders
