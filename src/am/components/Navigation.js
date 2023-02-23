import React from 'react'
import { NavLink } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Toolbar, Typography, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'

import logo from '../../images/maher.png'
import { orderStatus } from '../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '32px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    minHeight: '300px',
  },
  logo: {
    marginBottom: '5vh',
    height: '50px',
    display: 'grid',
    alignContent: 'center',
    textDecoration: 'none',
    color: '#ffffff',
  },
  navButton: {
    marginBottom: '16px',
    textDecoration: 'none',
    color: '#ffffff',
    width: '100%',
    '&.active': {
      '& div': {
        background: '#0e88d9',
      },
    },
  },
  navButtonWrapping: {
    width: '100%',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    '& p': {
      marginLeft: '16px',
      marginRight: 'auto',
    },
  },
  dotUnread: {
    color: theme.palette.highlight.main,
    marginRight: '16px',
  },
  dotOther: {
    display: 'hidden',
  },
  logout: {
    cursor: 'pointer',
    marginTop: 'auto',
    marginBottom: '16px',
  },
}))

const Navigation = () => {
  const classes = useStyles()
  const readOrders = useSelector((state) => state.readOrders)
  const customerOrders = useSelector((state) => state.customerOrders)

  const hasNewOrder = customerOrders.some(
    ({ id: orderId, metadata: { status } }) =>
      status === orderStatus.submitted &&
      !readOrders.find((id) => id === orderId)
  )
  const orderStatusClass = hasNewOrder ? classes.dotUnread : classes.dotOther

  return (
    <Toolbar className={classes.root}>
      <div className={classes.logo}>
        <img src={logo}></img>
      </div>
      <NavLink
        to="/app/orders"
        className={`${classes.navButton}`}
        activeclassname={classes.navActive}
      >
        <Box className={classes.navButtonWrapping}>
          <Typography>Orders</Typography>
          <Typography variant="h5" className={orderStatusClass}>
            {hasNewOrder ? '·' : '\xa0'}
          </Typography>
        </Box>
      </NavLink>
      <Box className={`${classes.navButtonWrapping} ${classes.logout}`}>
        <Typography>Log Out</Typography>
      </Box>
    </Toolbar>
  )
}

export default Navigation
