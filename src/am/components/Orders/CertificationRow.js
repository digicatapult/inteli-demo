import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    padding: 8,
    width: '100%',
    height: '32px',
    marginBottom: '8px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  rowItem: {
    display: 'grid',
    alignItems: 'center',
  },
})

const CertificationRow = ({ metadata, requiredCert }) => {
  const { metadataKey, description } = requiredCert
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={1} className={`${classes.rowItem}`}>
          <Typography variant="h5">
            {metadata[metadataKey] ? '·' : '\xa0'}
          </Typography>
        </Grid>
        <Grid item xs={7} className={classes.rowItem}>
          <Typography>{description}</Typography>
        </Grid>
        <Grid item xs={4} className={`${classes.rowItem}`}>
          {
            //TODO download/upload
          }
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CertificationRow
