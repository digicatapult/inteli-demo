import { Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  deliveryByContainer: {
    padding: '0px',
    display: 'grid',
    gridTemplateColumns: '4fr',
  },
  deliveryByLabel: {
    margin: '12px 0px 12px 0px',
    fontWeight: '600',
  },
  deliveryByInput: {
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    padding: '4px 16px',
  },
  errorText: {
    color: '#ff0000',
    margin: '8px 0px',
    height: '40px',
  },
})

const OrderDeliveryByDatePicker = ({ handleChange, label, errorMessage }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.deliveryByContainer}>
      <Typography variant="subtitle1" className={classes.deliveryByLabel}>
        {label}
      </Typography>
      <TextField
        id="date"
        type="date"
        onChange={handleChange('deliveryBy')}
        className={classes.deliveryByInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Typography variant="subtitle1" className={classes.errorText}>
        {errorMessage}
      </Typography>
    </Grid>
  )
}

export default OrderDeliveryByDatePicker
