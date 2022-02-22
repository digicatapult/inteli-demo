import React from 'react'
import Timeline from '@material-ui/lab/Timeline/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot/TimelineDot'
import { Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid } from '@material-ui/core'
import moment from 'moment'

import { orderStatus } from '../../utils/statuses'

const useStyles = makeStyles({
  dateTime: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    float: 'right',
    color: '#868B92',
    fontWeight: '350',
  },
  time: {
    paddingLeft: '20px',
  },
  timelineRowContent: {
    padding: '20px 0px 40px 0px',
  },
})

const statusLabels = [
  'Order placed',
  'Order accepted',
  'Certification',
  'Dispatched',
  'Delivered',
  'Amended',
]

const VerticalTimeline = ({ order }) => {
  const classes = useStyles()

  const {
    id: orderId,
    metadata: { status },
    timestamp,
  } = order

  const tokenTimestampFormattedDate =
    moment(timestamp).format('DD-MM-YYYY hh:mm')

  // Set the current status order. Again will eventually need updating with more states
  let statusIndex = 0
  if (status === orderStatus.submitted) {
    statusIndex = 1
  } else if (status === orderStatus.accepted) {
    statusIndex = 2
  } else if (status === orderStatus.manufacturing) {
    statusIndex = 3
  } else if (status === orderStatus.manufactured) {
    statusIndex = 4
  } else if (status === orderStatus.amended) {
    statusIndex = 2
  } else {
    statusIndex = 0
  }

  // Helper function to decide the colour of a timeline segment
  const getTimelineColour = (index, value) => {
    if (index >= value) {
      return '#FF9900'
    } else {
      return '#CCCCCC'
    }
  }

  return (
    <Grid container id={orderId} spacing={0}>
      <Grid item xs>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 1)}`,
                }}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 1)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[0]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 2)}`,
                }}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 2)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {status === 'amended'
                        ? statusLabels[statusLabels.length - 1]
                        : statusLabels[1]}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 3)}`,
                }}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 3)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[2]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 4)}`,
                }}
              />
              <TimelineConnector
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 4)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                {' '}
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[3]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: `${getTimelineColour(statusIndex, 5)}`,
                }}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">{statusLabels[4]}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {tokenTimestampFormattedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      className={classes.timelineRowContent}
                      variant="subtitle1"
                    ></Typography>
                  </Grid>
                </Grid>
              </TimelineContent>
              <TimelineOppositeContent />
            </Grid>
          </TimelineItem>
        </Timeline>
      </Grid>
    </Grid>
  )
}
export default VerticalTimeline
