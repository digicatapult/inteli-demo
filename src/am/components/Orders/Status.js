import React from 'react'
import { Typography, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

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
  statusAccepted: {
    background: theme.palette.statusAcceptedTested.main,
  },
  statusSent: {
    background: theme.palette.statusSent.main,
  },
}))

const OrderStatus = ({ orderStatus }) => {
  const classes = useStyles()

  let statusText = null,
    statusClass = null
  switch (orderStatus) {
    case 'SubmittedOrder':
      statusText = 'Requested'
      statusClass = `${classes.status} ${classes.statusRequested}`
      break
    case 'AcceptedOrder':
      statusText = 'Accepted'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
    case 'ManufacturedOrder':
      statusText = 'Manufactured'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
    case 'ManufacturingOrder':
      statusText = 'Manufacturing'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
    case 'CompletedOrder':
      statusText = 'Sent'
      statusClass = `${classes.status} ${classes.statusSent}`
      break
  }

  return (
    <Box className={`${statusClass}`}>
      <Typography>{statusText}</Typography>
    </Box>
  )
}

export default OrderStatus
