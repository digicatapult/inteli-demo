import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import CertificationRow from './CertificationRow'

const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
})

const Certification = ({ metadata }) => {
  console.log(metadata)
  const classes = useStyles()

  return (
    <Box>
      <Typography className={classes.inline} variant="subtitle3">
        Upload Certifications
      </Typography>
      <Grid container direction="row">
        {metadata.requiredCerts.map((cert) => {
          return (
            <CertificationRow
              key={cert.metadataKey}
              metadata={metadata}
              requiredCert={cert}
            />
          )
        })}
      </Grid>
    </Box>
  )
}

export default Certification
