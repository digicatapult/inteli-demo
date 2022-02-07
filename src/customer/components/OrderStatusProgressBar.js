import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useSelector } from 'react-redux'

import DownloadButton from './DownloadButton'
import ProgressBarSelector from './ProgressBarSelector'
import { powderTestStatus, orderStatus } from '../../utils'

const useStyles = makeStyles({
  backButton: {
    textDecoration: 'none',
  },
  order: {
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
  progressBarSmall: {
    width: 171,
  },
  progressBarLarge: {
    width: 180,
  },
  progressBarWrapper: {
    textAlign: 'left',
  },
})

const OrderStatusProgressBar = (props) => {
  const { status, orderPowderId } = props

  const selectedLabTest = useSelector((state) =>
    state.labTests.find(
      ({ metadata: { status, powderId: labPowderId } }) =>
        status === powderTestStatus.result && labPowderId === orderPowderId
    )
  )

  const classes = useStyles()

  const ProgressBar = () => {
    const statusLabels = [
      'Order placed',
      'Order accepted',
      'Test results',
      'Dispatched',
      'Delivered',
    ]

    let statusIndex = 0
    if (status === orderStatus.submitted) {
      statusIndex = 0
    } else if (status === orderStatus.accepted) {
      statusIndex = 1
    } else if (status === orderStatus.manufactured) {
      if (selectedLabTest) {
        statusIndex = 2
      } else {
        statusIndex = 1
      }
    }

    return (
      <Grid container item direction="column">
        <ProgressBarSelector statusIndex={statusIndex} />
        <Grid container item direction="row">
          <Grid item className={classes.progressBarSmall}>
            <Typography variant="body2">{statusLabels[0]}</Typography>
          </Grid>
          <Grid item className={classes.progressBarSmall}>
            <Typography variant="body2">{statusLabels[1]}</Typography>
          </Grid>
          <Grid item className={classes.progressBarSmall}>
            <Typography variant="body2">{statusLabels[2]}</Typography>
          </Grid>
          <Grid item className={classes.progressBarSmall}>
            <Typography variant="body2">{statusLabels[3]}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{statusLabels[4]}</Typography>
          </Grid>
        </Grid>
        {statusIndex >= 2
          ? DownloadButton({ statusIndex, orderPowderId })
          : null}
      </Grid>
    )
  }

  return (
    <Grid container item direction="column">
      <Grid item>
        <ProgressBar />
      </Grid>
    </Grid>
  )
}

export default OrderStatusProgressBar
