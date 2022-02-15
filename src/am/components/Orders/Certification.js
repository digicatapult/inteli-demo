import React, { useState } from 'react'
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'

import CertificationRow from './CertificationRow'

const useStyles = makeStyles({
  container: {
    padding: '24px 28px',
  },
  title: {
    margin: '24px 0px',
  },
  buttonWrapper: {
    padding: '16px 0px',
    display: 'grid',
    justifyContent: 'right',
  },
  submitButton: {
    width: 128,
    height: 42,
    backgroundColor: '#8ac1bc',
    color: '#fff',
  },
})

const Certification = ({ order }) => {
  const classes = useStyles()

  const [isAccepting, setIsAccepting] = useState(false)

  const onChange = async () => {
    setIsAccepting(true)
    //TODO create token and upsert
  }

  return (
    <Grid container justify="space-between" className={classes.container}>
      <Typography variant="subtitle2" className={classes.title}>
        Upload Certifications
      </Typography>
      <Grid container direction="row">
        {order.metadata.requiredCerts.map((cert) => {
          return (
            <CertificationRow
              key={cert.metadataKey}
              metadata={order.metadata}
              requiredCert={cert}
            />
          )
        })}
      </Grid>
      <Container className={classes.buttonWrapper}>
        <Button
          variant="contained"
          className={classes.submitButton}
          disabled={false} // TODO disable until changes are made
          onClick={onChange}
        >
          {isAccepting ? (
            <CircularProgress color="secondary" size="30px" />
          ) : (
            'Submit All'
          )}
        </Button>
      </Container>
    </Grid>
  )
}

export default Certification
