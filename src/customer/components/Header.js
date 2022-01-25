import React from 'react'
import Navigation from './Navigation'

import { AppBar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: '60px',
    background: '#ff0033',
  },
})

const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position="sticky" className={classes.root}>
      <Navigation />
    </AppBar>
  )
}

export default Header
