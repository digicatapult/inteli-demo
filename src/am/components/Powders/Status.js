import React from 'react'
import { Typography, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  status: {
    width: '18ch',
    height: '3ch',
    borderRadius: '12px',
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

const PowderStatus = ({ labTest }) => {
  const classes = useStyles()

  let powderStatus = null
  if (labTest === null) {
    powderStatus = 'testRequired'
  } else if (!labTest.overallResult) {
    powderStatus = 'testRequested'
  } else {
    powderStatus = labTest.overallResult
  }

  let statusText = null,
    statusClass = null
  switch (powderStatus) {
    case 'testRequired':
      statusText = 'Testing required'
      statusClass = `${classes.status} ${classes.statusRequested}`
      break
    case 'testRequested':
      statusText = 'Awaiting tests'
      statusClass = `${classes.status} ${classes.statusRequested}`
      break
    case 'passed':
      statusText = 'In use'
      statusClass = `${classes.status} ${classes.statusAccepted}`
      break
    case 'failed':
      statusText = 'Do not use'
      statusClass = `${classes.status} ${classes.statusSent}`
      break
    default:
      break
  }

  return (
    <Box className={`${statusClass}`}>
      <Typography>{statusText}</Typography>
    </Box>
  )
}

export default PowderStatus
