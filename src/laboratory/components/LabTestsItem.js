import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { NavLink } from 'react-router-dom'
import { Paper, Typography, Grid } from '@material-ui/core'

import LabTestStatus from './LabTestStatus'

const useStyles = makeStyles(() => ({
  paperNonActive: {
    padding: 8,
    paddingTop: '18px',
    paddingBottom: '18px',
    borderRadius: '8px',
    marginBottom: '4px',
    background: '#f8f8f8',
    '&:hover': { background: '#fff' },
  },
  paperActive: {
    padding: 8,
    paddingTop: '18px',
    paddingBottom: '18px',
    borderRadius: '8px',
    marginBottom: '4px',
    background: '#fff',
  },
  navButton: {
    width: '100%',
    background: '#f8f8f8',
    textDecoration: 'none',
  },
  navActive: {
    textDecoration: 'none',
  },
}))

const LabTestsItem = (props) => {
  const { selectedId, status, id, powderReference } = props
  console.log(props)
  const tested = status !== 'request'
  const selected = selectedId === id ? true : false
  const statusText = tested ? 'tested' : 'requested'
  const classes = useStyles()
  return (
    <NavLink
      to={(tested ? '/app/tested/' : '/app/requests/') + id}
      className={classes.navButton}
      activeClassName={classes.navActive}
    >
      <Paper
        elevation={0}
        className={selected ? classes.paperActive : classes.paperNonActive}
      >
        <Grid container>
          <Grid item xs={8} center="true">
            <Typography>{powderReference}</Typography>
          </Grid>
          <Grid item xs={4}>
            <LabTestStatus labTestStatus={statusText} />
          </Grid>
        </Grid>
      </Paper>
    </NavLink>
  )
}

export default LabTestsItem
