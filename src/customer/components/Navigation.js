import React from 'react'
import { NavLink } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Toolbar, Typography, Box, Grid } from '@material-ui/core'

import NetworkStatusIndicator from './NetworkStatusIndicator'
import images from '../../images'

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  logo: {
    height: '50px',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: '10px',
    alignContent: 'center',
    textDecoration: 'none',
    color: 'white',
    '& img': {
      height: 'inherit',
    },
  },
  navActive: {
    borderBottom: '1px white solid',
  },
  navHover: {
    '&:hover': {
      borderBottom: '1px white solid',
    },
  },
  navButton: {
    height: '50px',
    display: 'grid',
    alignContent: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    marginLeft: '70px',
  },
  accountNameWrapper: {
    height: '50px',
    textDecoration: 'none',
    display: 'flex',
    gap: '10px',
    color: theme.palette.primary.contrastText,
    alignItems: 'center',
    justifyContent: 'right',
    marginLeft: '70px',
    '&:hover': {
      borderBottom: '1px white solid',
    },
  },
  avatar: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    color: '#f03',
    background: theme.palette.primary.contrastText,
    borderRadius: '50%',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  logout: {
    marginLeft: '70px',
    cursor: 'pointer',
  },
}))

const Navigation = () => {
  const classes = useStyles()
  const name = 'Stephen Turner'

  return (
    <Toolbar className={classes.root}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <div className={classes.logo}>
            <img src={images.logoCust}></img>
          </div>
        </Grid>
        <Grid item md={2}>
          <NavLink
            to="/app/customer-parts"
            className={`${classes.navButton} ${classes.navHover}`}
            activeclassname={classes.navActive}
          >
            <Typography variant="subtitle2">Part inventory</Typography>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink
            to="/app/my-orders"
            className={`${classes.navButton} ${classes.navHover}`}
            activeclassname={classes.navActive}
          >
            <Typography variant="subtitle2">My orders</Typography>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink
            className={`${classes.accountNameWrapper} ${classes.navHover}`}
            to="#"
          >
            <Typography variant="subtitle2">{name}</Typography>
            <Typography className={classes.avatar}>
              {name.substring(0, 1)}
            </Typography>
          </NavLink>
        </Grid>
        <Grid item xs={1}>
          <Box className={classes.navButton}>
            <NetworkStatusIndicator />
          </Box>
        </Grid>
        <Grid>
          <Box
            className={`${classes.navButtonWrapping} ${classes.logout} ${classes.navButton} ${classes.navHover}`}
          >
            <Typography>Log Out</Typography>
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default Navigation
