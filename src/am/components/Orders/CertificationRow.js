import React from 'react'
import { CardMedia, Paper, Typography, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import removeUploadX from '../../../images/close-x-icon.svg'
import tick from '../../../images/tick.svg'
import pending from '../../../images/pending.svg'

const useStyles = makeStyles({
  root: {
    padding: '8px 0px',
    width: '100%',
  },
  rowItem: {
    display: 'grid',
    alignItems: 'center',
    height: '32px',
  },
  clickable: {
    '&&:hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    display: 'block',
    margin: 'auto',
    width: '16px',
    height: '16px',
  },
})

const removeUpload = () => {
  //TODO
}

const CertificationRow = ({ metadata, requiredCert }) => {
  const { metadataKey, description } = requiredCert
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={1} className={classes.rowItem}>
          {metadata[metadataKey] ? (
            <CardMedia image={tick} className={classes.icon} />
          ) : (
            <CardMedia image={pending} className={classes.icon} />
          )}
        </Grid>
        <Grid item xs={8} className={classes.rowItem}>
          <Typography>{description}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.rowItem}>
          *Download*
          {
            //TODO download/upload
          }
        </Grid>

        <Grid item xs={1} className={classes.rowItem}>
          <CardMedia
            image={removeUploadX}
            className={`${classes.icon} ${classes.clickable}`}
            onClick={removeUpload}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CertificationRow
