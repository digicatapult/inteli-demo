import React from 'react'
import { Grid } from '@material-ui/core'

import makeStyles from '@material-ui/core/styles/makeStyles'

import CertificationRow from './CertificationRow'

const useStyles = makeStyles({
  container: {
    padding: '24px 0px',
  },
})

const Certification = ({ order }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid container direction="row">
        {order.metadata.requiredCerts.map((cert) => {
          return (
            <CertificationRow
              key={cert.metadataKey}
              order={order}
              requiredCert={cert}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Certification
