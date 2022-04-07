import React from 'react'
import {
  Typography,
  Grid,
  CardMedia,
  Paper,
  CardActionArea,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Link as RouterLink } from 'react-router-dom'
import moment from 'moment'
import Spacer from '../../shared/Spacer'

const useStyles = makeStyles((theme) => ({
  maherStyle: {
    backgroundColor: '#0C74BB',
    color: '#ffff',
    padding: '5px',
    border: ' 1px solid 0C74BB',
    borderRadius: '3px',
    marginRight: '20px',
  },
  listPadding: {
    paddingBottom: '20px',
  },
  listItemMargin: {
    marginBottom: '10px',
  },
  datePadding: {
    paddingLeft: '103px',
    paddingTop: '5px',
  },
  isNotActive: {
    background: '#f8f8f8',
  },
  isActive: {
    background: '#fff',
  },
  fourHundFont: {
    fontWeight: '400',
  },
  threeFiftyFont: {
    fontWeight: '350',
  },
  dateColour: {
    color: theme.palette.primary.grey,
  },
  maherPadding: {
    paddingLeft: '25px',
  },
}))

const SummaryRow = ({ order, activeItem }) => {
  const classes = useStyles()
  const {
    id: orderId,
    metadata: { name, orderImage, quantity },
    timestamp,
    forecastDate,
  } = order
  const tokenTimestampFormattedDate = moment(timestamp).format('DD MMM YYYY')
  const isForecastLate = moment(forecastDate).diff(timestamp, 'days') > 7

  return (
    <Paper
      id={orderId}
      elevation={0}
      className={`${activeItem ? classes.isActive : classes.isNotActive}`}
    >
      <CardActionArea
        onClick={() => {}}
        component={RouterLink}
        to={`/app/my-orders/${orderId}`}
      >
        <Grid container className={classes.listItemMargin}>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              alt={orderImage.filename}
              width="160"
              image={orderImage.url}
              title={orderImage.filename}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.listPadding}
            >
              {name}
            </Typography>
            <Typography
              variant="subtitle2"
              component="h6"
              display="inline"
              className={classes.maherStyle}
            >
              MAHER
            </Typography>
            <Typography
              variant="subtitle2"
              component="h6"
              display="inline"
              className={`${classes.fourHundFont} ${classes.maherPadding}`}
            >
              Qnt: {quantity}
            </Typography>
            <Spacer height={1} />
            <Grid container direction="row" alignItems="center">
              <Grid item xs={6}>
                <Typography variant="subtitle2" component="h6">
                  Order Date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  style={{ color: '#a1a1a1' }}
                  variant="subtitle2"
                  component="h6"
                >
                  {tokenTimestampFormattedDate}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={6}>
                <Typography variant="subtitle2" component="h6">
                  Forecast:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  style={{ color: isForecastLate ? 'red' : '#a1a1a1' }}
                  variant="subtitle2"
                  component="h6"
                >
                  {forecastDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  )
}

export default SummaryRow
