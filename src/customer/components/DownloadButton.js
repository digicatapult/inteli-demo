import { Grid, Typography } from '@material-ui/core'
import Download from './Download'
import React from 'react'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { tokenTypes, powderTestStatus } from '../../utils'

const useStyles = makeStyles({
  download: {
    width: 405,
    backgroundColor: '#f8ead5',
    marginTop: 24,
    padding: '8px 24px',
    borderRadius: 6,
  },
  passText: {
    color: 'green',
  },
  failText: {
    color: 'red',
  },
})

const DownloadButton = (props) => {
  const { statusIndex, orderPowderId } = props
  const selectedLabTest = useSelector((state) =>
    state.labTests.find(
      ({ powderId, type, status }) =>
        type === tokenTypes.powderTest &&
        status === powderTestStatus.result &&
        powderId === orderPowderId
    )
  )
  const classes = useStyles()

  if (statusIndex && selectedLabTest && selectedLabTest.testReport) {
    return (
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        className={classes.download}
      >
        <Grid container item xs={8} spacing={1}>
          <Grid item>
            <Typography variant="body2">
              Your test results are ready:
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              className={
                selectedLabTest.overallResult === 'passed'
                  ? classes.passText
                  : classes.failText
              }
            >
              {selectedLabTest.overallResult === 'passed' ? 'PASS' : 'FAIL'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Download
            name={selectedLabTest.testReport.name}
            downloadData={selectedLabTest.testReport.url}
          />
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default DownloadButton
