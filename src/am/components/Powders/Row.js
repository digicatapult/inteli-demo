import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Paper, Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PowderStatus from './Status'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8px',
    paddingLeft: '32px',
    textDecoration: 'none',
    background: 'transparent',
  },
  gridContainer: {
    height: '48px',
  },
  rowItem: {
    display: 'grid',
    alignItems: 'center',
  },
  dotUnread: {
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    color: theme.palette.highlight.main,
    paddingLeft: '8px',
    marginLeft: '-32px',
  },
  dotOther: {
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    color: 'transparent',
    paddingLeft: '8px',
    marginLeft: '-32px',
  },
}))

const PowderRow = ({ powder, labTest }) => {
  const {
    id: powderId,
    original_id,
    metadata: {
      powderReference,
      material,
      alloy,
      quantityKg,
      particleSizeUm,
      location,
    },
  } = powder

  const classes = useStyles()
  const readPowders = useSelector((state) => state.readPowders)

  const isNewPowder = !readPowders.find((id) => id === powderId)
  const dotClass = isNewPowder ? classes.dotUnread : classes.dotOther

  return (
    <Paper
      component={RouterLink}
      to={`/app/powders/${original_id}`}
      elevation={0}
      className={classes.root}
    >
      <Grid className={classes.gridContainer} container direction="row">
        <div>
          <Typography variant="h5" className={dotClass}>
            {'·'}
          </Typography>
        </div>
        <Grid className={classes.rowItem} item xs>
          <Typography>{powderReference}</Typography>
        </Grid>
        <Grid className={classes.rowItem} item xs>
          <Typography>{material}</Typography>
        </Grid>
        <Grid className={classes.rowItem} item xs>
          <Typography>{alloy}</Typography>
        </Grid>
        <Grid className={classes.rowItem} item xs>
          <Typography>{quantityKg + 'kg'}</Typography>
        </Grid>
        <Grid className={classes.rowItem} item xs>
          <Typography>{particleSizeUm + 'µm'}</Typography>
        </Grid>
        <Grid className={classes.rowItem} item xs>
          <Typography>{location}</Typography>
        </Grid>
        <Grid className={classes.rowItem} item xs>
          <PowderStatus labTest={labTest} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PowderRow
