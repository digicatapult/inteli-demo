import { Grid, Input, Typography } from '@material-ui/core'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  quantityContainer: {
    margin: '0px 0px',
    padding: '0px',
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  quantityLabel: {
    margin: '12px 0px 12px 0px',
    fontWeight: '600',
  },
  quantityInput: {
    width: '150px',
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    padding: '4px 16px',
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  errorText: {
    color: '#ff0000',
    margin: '8px 0px',
    height: '40px',
  },
})

const OrderQuantityInput = ({
  handleChange,
  label,
  quantity,
  errorMessage,
}) => {
  const classes = useStyles()

  return (
    <Grid item xs={4} className={classes.quantityContainer}>
      <Typography variant="subtitle1" className={classes.quantityLabel}>
        {label}
      </Typography>
      <Input
        item
        className={classes.quantityInput}
        name="quantity"
        onChange={handleChange('quantity')}
        value={quantity}
      />
      <Typography variant="subtitle1" className={classes.errorText}>
        {errorMessage}
      </Typography>
    </Grid>
  )
}

export default OrderQuantityInput
