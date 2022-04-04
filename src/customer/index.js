import 'reset-css'
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Router from './router'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f918b',
      grey: '#868B92',
    },
    accept: {
      main: '#17AE93',
    },
  },
})

const CustomerApp = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default CustomerApp
