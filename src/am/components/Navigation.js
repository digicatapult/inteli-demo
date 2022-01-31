import React from 'react'
import { NavLink } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Toolbar, Typography, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'

import logo from '../../images/maher.png'
import { tokenTypes, powderTestStatus } from '../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '32px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '40vh',
    minHeight: '300px',
  },
  logo: {
    marginBottom: 'auto',
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
        background: theme.palette.primary.dark,
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
}))

const Navigation = () => {
  const classes = useStyles()
  const readOrders = useSelector((state) => state.readOrders)
  const readPowders = useSelector((state) => state.readPowders)
  const readTests = useSelector((state) => state.readTests)
  const customerOrders = useSelector((state) => state.customerOrders)
  const powders = useSelector((state) => state.powders)
  const testResults = useSelector((state) =>
    state.labTests.filter(
      ({ metadata: { type, status } }) =>
        type === tokenTypes.powderTest && status === powderTestStatus.result
    )
  )

  const hasNewOrder = customerOrders.some(
    (order) =>
      order.type === 'SubmittedOrder' &&
      !readOrders.find((id) => id === order.id)
  )
  const orderStatusClass = hasNewOrder ? classes.dotUnread : classes.dotOther

  const hasNewPowder = powders.some(
    (powder) => !readPowders.find((id) => id === powder.id)
  )
  const powderStatusClass = hasNewPowder ? classes.dotUnread : classes.dotOther

  const hasNewTests = testResults.some(
    (test) => !readTests.find((id) => id === test.id)
  )
  const testStatusClass = hasNewTests ? classes.dotUnread : classes.dotOther

  return (
    <Toolbar className={classes.root}>
      <div className={classes.logo}>
        <img src={logo}></img>
      </div>
      <NavLink
        to="/app/orders"
        className={`${classes.navButton}`}
        activeClassName={classes.navActive}
      >
        <Box className={classes.navButtonWrapping}>
          <Typography>Orders</Typography>
          <Typography variant="h5" className={orderStatusClass}>
            {hasNewOrder ? '·' : '\xa0'}
          </Typography>
        </Box>
      </NavLink>
      <NavLink
        to="/app/powders"
        className={`${classes.navButton}`}
        activeClassName={classes.navActive}
      >
        <Box className={classes.navButtonWrapping}>
          <Typography>Powder Inventory</Typography>
          <Typography variant="h5" className={powderStatusClass}>
            {hasNewPowder ? '·' : '\xa0'}
          </Typography>
        </Box>
      </NavLink>
      <NavLink
        to="/app/tests"
        className={classes.navButton}
        activeClassName={classes.navActive}
      >
        <Box className={classes.navButtonWrapping}>
          <Typography>Test Results</Typography>
          <Typography variant="h5" className={testStatusClass}>
            {hasNewTests ? '·' : '\xa0'}
          </Typography>
        </Box>
      </NavLink>
    </Toolbar>
  )
}

export default Navigation
