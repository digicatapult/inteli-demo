import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Paper, Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'

import TestStatus from './Status'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    width: '100%',
    height: '32px',
    marginBottom: '8px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  rowItem: {
    display: 'grid',
    alignItems: 'center',
  },
  dotUnread: {
    color: theme.palette.highlight.main,
    paddingLeft: '8px',
  },
  dotOther: {
    display: 'hidden',
  },
}))

const TestRow = ({ test }) => {
  const {
    id: testId,
    metadata: { powderReference, overallResult },
  } = test
  const classes = useStyles()
  const readTests = useSelector((state) => state.readTests)

  const isNewTest = !readTests.find((id) => id === testId)

  return (
    <Paper
      component={RouterLink}
      to={`/app/tests/${testId}`}
      elevation={0}
      className={classes.root}
    >
      <Grid container>
        <Grid
          item
          xs={1}
          className={`${isNewTest ? classes.dotUnread : ''} ${classes.rowItem}`}
        >
          <Typography variant="h5">{isNewTest ? '·' : '\xa0'}</Typography>
        </Grid>
        <Grid item xs={7} className={classes.rowItem}>
          <Typography>{powderReference}</Typography>
        </Grid>
        <Grid item xs={4} className={`${classes.rowItem}`}>
          <TestStatus testStatus={overallResult} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TestRow
