import React, { useEffect } from 'react'
import 'reset-css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Router from './router'

// import { useAuth0 } from '@auth0/auth0-react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f918b',
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

  // const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  useEffect(() => {
    // if (!isLoading) {
    //   if (!isAuthenticated) {
    //     loginWithRedirect()
    //   }
    // }
  })

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
