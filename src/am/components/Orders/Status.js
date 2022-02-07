import React from 'react'
import { Typography, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { orderStatus } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  status: {
    width: '16ch',
    height: '3ch',
    borderRadius: '12px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#ffffff',
  },
  statusRequested: {
    background: theme.palette.statusRequested.main,
  },
  statusRejected: {
    background: theme.palette.statusRejected.main,
  },
  statusAccepted: {
    background: theme.palette.statusAcceptedTested.main,
  },
  statusSent: {
    background: theme.palette.statusSent.main,
  },
}))

const OrderStatus = ({ status }) => {
  const classes = useStyles()

  let statusText = null,
    statusClass = null
  switch (status) {
    case orderStatus.submitted:
      statusText = 'Requested'
      statusClass = `${classes.status} ${classes.statusRequested}`
      break
    case orderStatus.amended:
      statusText = 'Rejected'
      statusClass = `${classes.status} ${classes.statusRejected}`
      break
    case orderStatus.accepted:
      statusText = 'Accepted'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
    case orderStatus.manufacturing:
      statusText = 'Manufacturing'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
    case orderStatus.manufactured:
      statusText = 'Manufactured'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
  }

  return (
    <Box className={`${statusClass}`}>
      <Typography>{statusText}</Typography>
    </Box>
  )
}

export default OrderStatus
