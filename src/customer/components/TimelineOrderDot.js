import React from 'react'
import TimelineDot from '@material-ui/lab/TimelineDot/TimelineDot'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { getTimelineStatusIndex } from '../../utils/timeline'
import { orderStatus } from '../../utils'

const useStyles = makeStyles({
  orangeDot: {
    backgroundColor: '#ff9900',
  },
  greyDot: {
    backgroundColor: '#ccc',
  },
  redDot: {
    backgroundColor: '#fff',
    borderColor: '#c5052b',
  },
})

const TimelineOrderDot = ({ row, status }) => {
  const classes = useStyles()

  const statusIndex = getTimelineStatusIndex(status)

  const getTimelineDotClassName = (status) => {
    if (status === orderStatus.amended && row === 2) {
      return classes.redDot
    } else if (statusIndex >= row) {
      return classes.orangeDot
    } else {
      return classes.greyDot
    }
  }

  return <TimelineDot className={getTimelineDotClassName(status)} />
}

export default TimelineOrderDot
