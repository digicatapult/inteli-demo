import React from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Attachment from './Attachment'
import LabTestRow from './LabTestRow'

const useStyles = makeStyles({
  root: { marginTop: '40px', marginBottom: '40px', padding: '8px' },
  border: { border: '1px lightgrey solid', borderLeft: 0, borderRight: 0 },
  button: { width: '290px', height: '55px', margin: '20px' },
  heading: { padding: '16px 30px' },
})

const LabTestDetailsOverview = ({
  id,
  powderReference,
  requiredTests,
  overallResult,
  testReason,
  testReport,
  changeIsEditMode,
}) => {
  const classes = useStyles()
  console.log('testReport', testReport)
  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid xs={12}>
        <Paper>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            className={classes.heading}
          >
            <Typography variant="h6" component="h6">
              Request no.{id}
            </Typography>
          </Grid>

          <Grid container className={classes.border}>
            <LabTestRow title={'Product code'} value={'AS51-AD/A'} />
            <LabTestRow title={'Product description'} value={'Aero Additive'} />
            <LabTestRow title={'Manufaturer’s name'} value={'Airr, Inc'} />
            <LabTestRow title={'Powder ID'} value={powderReference} />
          </Grid>

          <Grid container xs={12} className={classes.root}>
            <Attachment name="Custom-Requirements.pdf" />
            <Attachment name="MSDS-Form.pdf" />
          </Grid>

          {requiredTests && requiredTests.length ? (
            <Grid container className={classes.border}>
              <LabTestRow title={'Standard'} value={'TestName'} bold={true} />

              {requiredTests.map((requirement, i) => {
                const k = i
                return (
                  <LabTestRow
                    key={k}
                    title={requirement[0]}
                    value={requirement[1]}
                  />
                )
              })}
            </Grid>
          ) : (
            <></>
          )}

          {overallResult ? (
            <Grid container className={classes.border}>
              <LabTestRow title={'Test Results'} value={''} bold={true} />
              <LabTestRow title={'Passed/Failed'} value={overallResult} />
              <LabTestRow title={'Reason'} value={testReason} />
              {testReport ? (
                <Attachment
                  name={testReport.name}
                  downloadData={testReport.url}
                />
              ) : (
                <></>
              )}
            </Grid>
          ) : (
            <Grid container direction="column" alignItems="center">
              <Button
                size="medium"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => changeIsEditMode()}
              >
                Send for testing
              </Button>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LabTestDetailsOverview
