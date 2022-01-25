import React from 'react'
import { Typography, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  status: {
    width: '16ch',
    height: '3ch',
    borderRadius: '12px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#ffffff',
  },
  statusPassed: {
    background: '#8EC8C4',
  },
  statusFailed: {
    background: '#F9CC8A',
  },
})

const OrderStatus = ({ testStatus }) => {
  const classes = useStyles()

  let statusText = null,
    statusClass = null
  switch (testStatus) {
    case 'passed':
      statusText = 'Passed'
      statusClass = `${classes.status} ${classes.statusPassed}`
      break
    case 'failed':
      statusText = 'Failed'
      statusClass = `${classes.status} ${classes.statusFailed}`
      break
  }

  return (
    <Box className={`${statusClass}`}>
      <Typography>{statusText}</Typography>
    </Box>
  )
}

export default OrderStatus
