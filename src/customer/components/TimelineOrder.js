import React from 'react'
import Timeline from '@material-ui/lab/Timeline/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator/TimelineSeparator'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent/TimelineOppositeContent'
import { Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Grid } from '@material-ui/core'

import { orderStatus } from '../../utils/statuses'
import TimelineAmendedItem from './TimelineAmendedItem'
import TimelineOrderConnector from './TimelineOrderConnector'
import TimelineOrderDot from './TimelineOrderDot'
import Certification from './Certification'
import {
  getStatusLabel,
  getMetadataTimestamp,
  getTimelineStatusIndex,
} from '../../utils/timeline'

const useStyles = makeStyles((theme) => ({
  dateTime: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    float: 'right',
    color: theme.palette.primary.grey,
    fontWeight: '350',
  },
  time: {
    paddingLeft: '20px',
  },
  timelineSeparator: {
    minHeight: '110px',
  },
  timelineRowContent: {
    padding: '20px 0px 40px 0px',
  },
}))

const TimelineOrder = ({ order }) => {
  const classes = useStyles()

  const {
    id: orderId,
    metadata: { status: latestStatus },
  } = order

  return (
    <Grid container id={orderId} spacing={0}>
      <Grid item xs>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineOrderDot
                latestStatus={latestStatus}
                rowStatus={orderStatus.submitted}
              />
              <TimelineOrderConnector
                latestStatus={latestStatus}
                rowStatus={orderStatus.submitted}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {getStatusLabel(orderStatus.submitted)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {getMetadataTimestamp(
                        order.history,
                        'status',
                        orderStatus.submitted
                      )}
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
          {getMetadataTimestamp(
            order.history,
            'status',
            orderStatus.amended
          ) && (
            <TimelineItem>
              <TimelineSeparator className={classes.timelineSeparator}>
                <TimelineOrderDot
                  latestStatus={latestStatus}
                  rowStatus={orderStatus.amended}
                />
                <TimelineOrderConnector
                  latestStatus={latestStatus}
                  rowStatus={orderStatus.amended}
                />
              </TimelineSeparator>
              <Grid item sm={12}>
                <TimelineContent>
                  <Grid container alignItems="flex-start">
                    <Grid item xs={9}>
                      <Typography variant="h6">
                        {getStatusLabel(orderStatus.amended)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        className={`${classes.dateTime} ${classes.time}`}
                      >
                        {getMetadataTimestamp(
                          order.history,
                          'status',
                          orderStatus.amended
                        )}
                      </Typography>
                    </Grid>
                    <TimelineAmendedItem order={order} />
                  </Grid>
                </TimelineContent>
              </Grid>
            </TimelineItem>
          )}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineOrderDot
                latestStatus={latestStatus}
                rowStatus={orderStatus.accepted}
              />
              <TimelineOrderConnector
                latestStatus={latestStatus}
                rowStatus={orderStatus.accepted}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {getStatusLabel(orderStatus.accepted)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {getMetadataTimestamp(
                        order.history,
                        'status',
                        orderStatus.accepted
                      )}
                    </Typography>
                  </Grid>

                  {getTimelineStatusIndex(latestStatus) >=
                    getTimelineStatusIndex(orderStatus.accepted) && (
                    <Certification order={order} />
                  )}
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
              <TimelineOrderDot
                latestStatus={latestStatus}
                rowStatus={orderStatus.manufacturing}
              />
              <TimelineOrderConnector
                latestStatus={latestStatus}
                rowStatus={orderStatus.manufacturing}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {getStatusLabel(orderStatus.manufacturing)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {getMetadataTimestamp(
                        order.history,
                        'status',
                        orderStatus.manufacturing
                      )}
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
              <TimelineOrderDot
                latestStatus={latestStatus}
                rowStatus={orderStatus.manufactured}
              />
            </TimelineSeparator>
            <Grid item sm={12}>
              <TimelineContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={9}>
                    <Typography variant="h6">
                      {getStatusLabel(orderStatus.manufactured)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={`${classes.dateTime} ${classes.time}`}
                    >
                      {getMetadataTimestamp(
                        order.history,
                        'status',
                        orderStatus.manufactured
                      )}
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
export default TimelineOrder
