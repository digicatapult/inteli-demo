import { Grid, InputLabel, TextField } from '@material-ui/core'
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
    padding: '0px',
    color: '#000',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  deliveryByInput: {
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    height: '32px',
    fontSize: '0.8rem',
    padding: '4px 16px',
    textDecoration: 'none',
  },
  errorText: {
    color: '#ff0000',
    fontSize: '1rem',
    margin: '8px 0px',
  },
})

const OrderDeliveryByDatePicker = ({
  handleChange,
  deliveryByLabel,
  deliveryByError,
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.deliveryByContainer}>
      <InputLabel className={classes.deliveryByLabel}>
        {deliveryByLabel}
      </InputLabel>
      <TextField
        id="date"
        type="date"
        onChange={handleChange('deliveryBy')}
        className={classes.deliveryByInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <div className={classes.errorText}>{deliveryByError}</div>
    </Grid>
  )
}

export default OrderDeliveryByDatePicker
