import React from 'react'
import { Grid } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CreateSupplier from './CreateSupplier'

const useStyles = makeStyles({
  container: {
    width: '1226px',
    paddingLeft: '120px',
    marginTop: '20px',
  },
})

const Suppliers = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <Grid item>
        <TextField
          id="standard-basic"
          label="Search Suppliers"
          variant="standard"
        />
      </Grid>
      <Grid item>
        <CreateSupplier />
      </Grid>
    </Grid>
  )
}

export default Suppliers
