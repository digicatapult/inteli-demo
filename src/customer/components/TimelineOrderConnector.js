import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TimelineConnector from '@material-ui/lab/TimelineConnector/TimelineConnector'

import { getTimelineStatusIndex } from '../../utils/timeline'
import { orderStatus } from '../../utils'

const useStyles = makeStyles({
  orangeLine: {
    backgroundColor: '#ff9900',
  },
  greyLine: {
    backgroundColor: '#ccc',
  },
  rejectedLine: {
    backgroundColor: '#bdbdbd',
  },
})

const TimelineOrderConnector = ({ row, status }) => {
  const classes = useStyles()

  const statusIndex = getTimelineStatusIndex(status)

  const getTimelineConnectorClassName = (status) => {
    if (status === orderStatus.amended && row === 2) {
      return classes.rejectedLine
    } else if (statusIndex >= row) {
      return classes.orangeLine
    } else {
      return classes.greyLine
    }
  }

  return <TimelineConnector className={getTimelineConnectorClassName(status)} />
}

export default TimelineOrderConnector
