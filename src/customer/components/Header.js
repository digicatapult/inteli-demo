import React from 'react'
import Navigation from './Navigation'

import { AppBar, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minHeight: '60px',
    background: '#ff0033',
  },
})

const Header = () => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="sticky" className={classes.root}>
          <Navigation />
        </AppBar>
      </Grid>
    </Grid>
  )
}

export default Header
