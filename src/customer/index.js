import React from 'react'
import 'reset-css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Router from './router'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1f918b',
    },
  },
})

const useStyles = makeStyles({
  content: {
    margin: '20px auto',
    maxWidth: '1350px',
  },
})

const CustomerApp = () => {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Container className={classes.content}>
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default CustomerApp
