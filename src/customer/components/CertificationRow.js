import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import tick from '../../images/tick.svg'
import pending from '../../images/pending.svg'
import CertificationDownload from '../../shared/CertificationDownload'
import { getMetadataTimestamp } from '../../utils/timeline'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px 0px',
    width: '100%',
  },
  rowItem: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
  },
  icon: {
    margin: 'auto',
    width: '16px',
    height: '16px',
  },
  greyText: {
    color: theme.palette.primary.grey,
  },
  timestamp: {
    color: theme.palette.primary.grey,
    fontWeight: '350',
    textAlign: 'right',
    width: '100%',
  },
}))

const CertificationRow = ({ order, requiredCert }) => {
  const { metadataKey, description } = requiredCert
  const classes = useStyles()

  const file = order.metadata[metadataKey]

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={1} className={classes.rowItem}>
          <img src={file ? tick : pending} className={classes.icon} />
        </Grid>
        {file ? (
          <>
            <Grid item xs={7} className={classes.rowItem}>
              <Typography>{description}</Typography>
            </Grid>
            <Grid item xs={2} className={classes.rowItem}>
              <CertificationDownload
                name={file.fileName}
                downloadData={file.url}
              />
            </Grid>
            <Grid item xs={2} className={classes.rowItem}>
              <Typography className={classes.timestamp}>
                {getMetadataTimestamp(order.history, requiredCert.metadataKey)}
              </Typography>
            </Grid>
          </>
        ) : (
          <Grid
            item
            xs={7}
            className={`${classes.greyText} ${classes.rowItem}`}
          >
            <Typography>{description}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default CertificationRow
