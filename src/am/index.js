import React from 'react'
import 'reset-css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Router from './router'

const theme = createTheme({
  palette: {
    primary: {
      main: '#8ec8c4',
      dark: '#0c75bb',
      contrastText: '#fff',
    },
    highlight: {
      main: '#ff9900',
    },
    statusRequested: {
      main: '#f9cc8a',
    },
    statusRejected: {
      main: '#f55e66',
    },
    statusAcceptedTested: {
      main: '#8ec8c4',
    },
    statusSent: {
      main: '#cccccc',
    },
  },
  typography: {
    subtitle2: {
      fontSize: 12,
    },
  },
})

const useStyles = makeStyles({
  content: {
    margin: '20px 0px',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: '250px',
    right: 0,
    maxWidth: 'min(calc(100vw - 250px), 1368px)',
    overflowY: 'scroll',
  },
})

const CustomerApp = () => {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Sidebar />
        <Container className={classes.content}>
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default CustomerApp
