import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { markTestRead } from '../../../features/readTestsSlice'
import Attachment from '../Attachment'

const useStyles = makeStyles({
  root: {
    marginLeft: '32px',
    border: 'solid 2px #ccc',
  },
  row: {
    padding: '32px',
    borderBottom: '1px lightgrey solid',
  },
  header: {
    padding: '16px 48px 12px 32px',
    '& h6': {
      marginRight: 'auto',
    },
  },
  fontBold: {
    fontWeight: '600',
  },
  testResultPassed: {
    color: '#8EC8C4',
  },
  testResultFailed: {
    color: '#F9CC8A',
  },
  attachment: {
    marginTop: '64px',
  },
})

const DetailRow = ({ title, value }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={3}>
        <Typography variant="body1" className={classes.fontBold}>
          {title ? `${title}:` : ''}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  )
}

const OrderDetail = ({ test }) => {
  const { overallResult, testReason, testReport, powderId } = test

  const classes = useStyles()
  const dispatch = useDispatch()
  const orders = useSelector((state) =>
    state.customerOrders.filter(
      ({ type, powderId: orderPowder }) =>
        type === 'ManufacturedOrder' && orderPowder === powderId
    )
  )

  const resultTextStyle = [
    classes.fontBold,
    overallResult === 'passed'
      ? classes.testResultPassed
      : classes.testResultFailed,
  ].join(' ')

  useEffect(() => {
    dispatch(markTestRead(test.id))
  }, [test, dispatch])

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid
        container
        alignItems="center"
        className={`${classes.row} ${classes.header}`}
      >
        <Typography variant="h6" component="h6">
          Overview
        </Typography>
      </Grid>
      <Grid container direction="row" className={classes.row}>
        <Grid container item xs={4}>
          <Grid item xs={2}>
            <Typography variant="body1" className={resultTextStyle}>
              {overallResult === 'passed' ? '✔' : '✖'}
            </Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={9}>
            <Typography variant="body1" className={resultTextStyle}>
              {overallResult === 'passed' ? 'PASS' : 'FAIL'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" className={classes.fontBold}>
            Reason:
          </Typography>
          {testReason?.url ? (
            <Attachment name={testReason.name} downloadData={testReason.url} />
          ) : (
            <Typography>No reason given</Typography>
          )}
        </Grid>
      </Grid>

      <Box className={classes.row}>
        <DetailRow title="Testing Company" value="TruForm"></DetailRow>
        <DetailRow title="Contact" value="timwood@truform.org.uk"></DetailRow>
        <DetailRow title="" value=" +44&nbsp;7602208091"></DetailRow>
        {/* TODO: Remove spacing cheat below */}
        <DetailRow title="" value="&nbsp;"></DetailRow>{' '}
        {orders.map((order) => (
          <Box key={order.id}>
            <DetailRow
              title="Order Number"
              value={order.orderReference}
            ></DetailRow>
            <DetailRow
              title="Part Name"
              value={order.orderDetails.name}
            ></DetailRow>
            <DetailRow
              title="Part Id"
              value={order.orderDetails.partId}
            ></DetailRow>
          </Box>
        ))}
        <Box className={classes.attachment}>
          {testReport?.url ? (
            <>
              <DetailRow title="Attached Documents"></DetailRow>
              <Attachment
                name={testReport.name}
                downloadData={testReport.url}
              />
            </>
          ) : (
            <DetailRow title="Report" value="No report"></DetailRow>
          )}
        </Box>
      </Box>
    </Paper>
  )
}

export default OrderDetail
