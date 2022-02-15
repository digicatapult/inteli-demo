import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea'
import {
  Paper,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core'

import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    padding: '4px',
    width: 291,
    border: 'none',
  },
  top: {
    backgroundColor: '#ccc',
    height: 182,
  },
  details: {
    display: 'inline',
  },
  lastPartDetailsRow: {
    marginTop: '4px',
  },
  backgroundColorMaher: {
    backgroundColor: '#0c74bb',
    borderRadius: '3px',
    padding: '4px 8px',
    color: '#fff',
  },
})

const CustomerPartItem = (props) => {
  const { partId, image, name, material, alloy, supplier } = props
  const classes = useStyles()

  return (
    <Paper elevation={0} id={partId} className={classes.root}>
      <CardActionArea
        component={RouterLink}
        to={`/app/customer-part/${partId}`}
      >
        <CardMedia
          component="img"
          alt={name}
          height="182"
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="body1">
            {name}
          </Typography>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              {partId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {material}
            </Typography>
          </Grid>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.lastPartDetailsRow}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes[`backgroundColor${supplier}`]}
            >
              {supplier}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {alloy}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Paper>
  )
}

export default CustomerPartItem
