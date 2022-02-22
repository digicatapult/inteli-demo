import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TimelineConnector from '@material-ui/lab/TimelineConnector/TimelineConnector'

import { getTimelineStatusIndex } from '../../utils/timeline'

const useStyles = makeStyles({
  orangeLine: {
    backgroundColor: '#ff9900',
  },
  greyLine: {
    backgroundColor: '#ccc',
    background: 'linear-gradient(#fff 50%, #ccc 50%)',
    backgroundSize: 'auto 10px',
  },
})

const TimelineOrderConnector = ({ latestStatus, rowStatus }) => {
  const classes = useStyles()

  const latestStatusIndex = getTimelineStatusIndex(latestStatus)
  const rowStatusIndex = getTimelineStatusIndex(rowStatus)

  const getTimelineConnectorClassName = (latestStatusIndex, rowStatusIndex) => {
    if (latestStatusIndex > rowStatusIndex) {
      return classes.orangeLine
    } else {
      return classes.greyLine
    }
  }

  return (
    <TimelineConnector
      className={getTimelineConnectorClassName(
        latestStatusIndex,
        rowStatusIndex
      )}
    />
  )
}

export default TimelineOrderConnector
