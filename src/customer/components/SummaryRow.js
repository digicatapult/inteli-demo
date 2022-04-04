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
  const {
    id: orderId,
    metadata: { name, orderImage, quantity },
    timestamp,
  } = order

  const classes = useStyles()
  const tokenTimestampFormattedDate = moment(timestamp).format('DD MMM YYYY')

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
            <Typography
              variant="subtitle2"
              component="h6"
              className={`${classes.datePadding} ${classes.threeFiftyFont} ${classes.dateColour} `}
            >
              {tokenTimestampFormattedDate}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  )
}

export default SummaryRow
