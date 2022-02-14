import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import CertificationRow from './CertificationRow'

const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
})

const getRequiredCerts = async (requiredCertsUrl) => {
  const response = await fetch(requiredCertsUrl)
  return await response.json()
}

const Certification = async ({ metadata }) => {
  console.log(metadata)
  const classes = useStyles()
  const requiredCerts = await getRequiredCerts(metadata.requiredCerts.url)

  console.log(requiredCerts)
  return (
    <Box>
      <Typography className={classes.inline} variant="subtitle2">
        Upload Certifications
      </Typography>
      <Grid container direction="row">
        <Grid container direction="column" item xs={5}>
          {[...requiredCerts].reverse().map((cert) => (
            <CertificationRow
              key={cert.metadataKey}
              metadata={metadata}
              requiredCert={cert}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Certification
