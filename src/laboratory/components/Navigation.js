import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { NavLink } from 'react-router-dom'
import { Container, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  navRequestsAndTestedBtn: {
    color: '#80FFFFFF',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'block',
    marginLeft: '4px',
    marginRight: '4px',
    height: '62px',
    '&:hover': {
      color: 'white',
    },
    '& h5': {
      lineHeight: '62px',
    },
  },
  navRequestsAndTestedActive: {
    color: '#FFFFFF',
    borderBottomColor: 'white',
    borderBottomStyle: 'solid',
    borderBottomWidth: '4px',
  },
})

const Navigation = () => {
  const classes = useStyles()
  return (
    <Container>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <NavLink
            to="/app/requests"
            className={classes.navRequestsAndTestedBtn}
            activeClassName={classes.navRequestsAndTestedActive}
          >
            <Typography variant="h5">Requests</Typography>
          </NavLink>
        </Grid>
        <Grid xs={3}>
          <NavLink
            to="/app/tested"
            className={classes.navRequestsAndTestedBtn}
            activeClassName={classes.navRequestsAndTestedActive}
          >
            <Typography variant="h5">Tested</Typography>
          </NavLink>
        </Grid>
        <Grid xs={3} />
      </Grid>
    </Container>
  )
}

export default Navigation
