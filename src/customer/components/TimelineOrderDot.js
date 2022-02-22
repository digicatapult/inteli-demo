import React from 'react'
import TimelineDot from '@material-ui/lab/TimelineDot/TimelineDot'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { getTimelineStatusIndex } from '../../utils/timeline'

const useStyles = makeStyles({
  orangeDot: {
    backgroundColor: '#ff9900',
  },
  greyDot: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  redDot: {
    backgroundColor: '#fff',
    borderColor: '#c5052b',
  },
})

const TimelineOrderDot = ({ latestStatus, rowStatus }) => {
  const classes = useStyles()

  const latestStatusIndex = getTimelineStatusIndex(latestStatus)
  const rowStatusIndex = getTimelineStatusIndex(rowStatus)

  const getTimelineDotClassName = (latestStatusIndex, rowStatusIndex) => {
    if (latestStatusIndex > rowStatusIndex) {
      return classes.orangeDot
    } else if (latestStatusIndex === rowStatusIndex) {
      return classes.redDot
    } else {
      return classes.greyDot
    }
  }

  return (
    <TimelineDot
      className={getTimelineDotClassName(latestStatusIndex, rowStatusIndex)}
    />
  )
}

export default TimelineOrderDot
