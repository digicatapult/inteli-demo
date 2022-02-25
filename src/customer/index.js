import React from 'react'
import 'reset-css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Router from './router'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f918b',
    },
    accept: {
      main: '#17AE93',
    },
  },
})

const useStyles = makeStyles({
  content: {
    margin: '130px 187px 87px 187px',
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
