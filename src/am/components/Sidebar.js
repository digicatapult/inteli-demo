import React from 'react'
import Navigation from './Navigation'

import { AppBar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '250px',
    height: '100vh',
    top: 0,
    left: 0,
    background: 'rgb(48,48,48)',
  },
})

const Sidebar = () => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.root}>
      <Navigation />
    </AppBar>
  )
}

export default Sidebar
