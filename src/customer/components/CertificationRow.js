import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import tick from '../../images/tick.svg'
import pending from '../../images/pending.svg'
import CertificationDownload from '../../shared/CertificationDownload'
import { orderStatus } from '../../utils/statuses'
import { getMetadataTimestamp } from '../../utils/timeline'

const useStyles = makeStyles({
  root: {
    padding: '8px 0px',
    width: '100%',
  },
  rowItem: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
  },
  clickable: {
    cursor: 'pointer',
  },
  icon: {
    display: 'block',
    margin: 'auto',
    width: '16px',
    height: '16px',
  },
  dnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: '#F8F8F8',
    border: '1px dashed #CCCCCC',
    borderRadius: '4px',
    height: '100%',
  },
  dndText: {
    textDecoration: 'underline',
  },
  greyText: {
    color: '#868B92',
  },
  dateTime: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    float: 'right',
    color: '#868B92',
    fontWeight: '350',
  },
  time: {
    textAlign: 'right',
    width: '100%',
  },
})

const CertificationRow = ({ order, requiredCert }) => {
  const { metadataKey, description } = requiredCert
  const classes = useStyles()

  const file = order.metadata[metadataKey]

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={1} className={classes.rowItem}>
          {file ? (
            <img src={tick} className={classes.icon} />
          ) : (
            <img src={pending} className={classes.icon} />
          )}
        </Grid>
        <Grid
          item
          xs={7}
          className={`${file ? '' : classes.greyText} ${classes.rowItem}`}
        >
          <Typography>{description}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.rowItem}>
          {file ? (
            <CertificationDownload name={file.name} downloadData={file.url} />
          ) : (
            <></>
          )}
        </Grid>

        <Grid item xs={2} className={classes.rowItem}>
          {file && (
            <Typography
              variant="subtitle1"
              className={`${classes.dateTime} ${classes.time}`}
            >
              {getMetadataTimestamp(
                order.history,
                requiredCert.metadataKey,
                orderStatus.accepted // value???????
              )}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CertificationRow
