import React from 'react'
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  buttonWrapper: {
    padding: '16px 32px',
    width: '100%',
    display: 'grid',
    justifyContent: 'right',
  },
  rejectButton: {
    width: 250,
    height: 42,
    backgroundColor: '#90192b',
  },
})

const RejectAction = () => {
  const classes = useStyles()
  return (
    <Container className={classes.buttonWrapper}>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        className={classes.rejectButton}
      >
        Reject
      </Button>
    </Container>
  )
}

export default RejectAction
