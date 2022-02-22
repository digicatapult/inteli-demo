import React, { useState } from 'react'
import { CardMedia, CardContent, Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import RejectOrderAction from './RejectAction'
import rejectAndNegotiateCloseX from '../../../images/close-x-black-icon.svg'
import OrderQuantityInput from '../../../shared/OrderQuantityInput'
import OrderDeliveryByDatePicker from '../../../shared/OrderDeliveryByDatePicker'
import { isDeliveryByInvalid, isQuantityInvalid } from '../../../utils/forms'

const useStyles = makeStyles({
  rejectAndNegotiateContainer: {
    padding: '24px 28px',
    margin: '32px 0px',
    width: '100%',
  },
  rejectAndNegotiateToggle: {
    '&&:hover': {
      cursor: 'pointer',
    },
  },
  rejectAndNegotiateX: {
    width: '16px',
    height: '16px',
  },
  rejectAndNegotiateTitle: {
    textDecoration: 'underline',
    fontWeight: '600',
  },
  rejectAndNegotiateDownArrow: {
    margin: '12px',
    width: '0px',
    height: '0px',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #000',
  },
  rejectAndNegotiateUpArrow: {
    margin: '12px',
    width: '0px',
    height: '0px',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '6px solid #000',
  },
  rejectAndNegotiateText: {
    margin: '32px 0px',
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
  },
})

const Negotiate = ({ order }) => {
  const classes = useStyles()

  const {
    metadata: { quantity: quantityOnChain },
  } = order

  const [quantity, setQuantity] = useState(quantityOnChain)
  const [quantityError, setQuantityError] = useState('')
  const [deliveryBy, setDeliveryBy] = useState('')
  const [deliveryByError, setDeliveryByError] = useState('')
  const [displayNegotiation, setDisplayNegotiation] = useState(true)

  const toggleNegotiationDisplay = () => {
    setDisplayNegotiation(!displayNegotiation)
  }

  const setQuantityValue = (value) => {
    const quantityValue = value.replace(/\D/g, '')

    setQuantityError(isQuantityInvalid(quantityValue, quantityOnChain))
    setQuantity(parseInt(quantityValue, 10) || quantityValue)
  }

  const setDeliveryByValue = (value) => {
    setDeliveryByError(isDeliveryByInvalid(value))
    setDeliveryBy(value)
  }

  const handleChange = (name) => (event) => {
    switch (name) {
      case 'quantity':
        setQuantityValue(event.target.value)
        break
      case 'deliveryBy':
        setDeliveryByValue(event.target.value)
        break
    }
  }

  const isFormReady = () => {
    return (
      !isQuantityInvalid(quantity, quantityOnChain) &&
      !isDeliveryByInvalid(deliveryBy)
    )
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.rejectAndNegotiateContainer}
    >
      <Grid item>
        <Grid container>
          <Grid
            item
            className={`${classes.rejectAndNegotiateToggle}`}
            onClick={toggleNegotiationDisplay}
          >
            <Typography
              variant="subtitle1"
              className={classes.rejectAndNegotiateTitle}
            >
              Reject &amp; negotiate
            </Typography>
          </Grid>
          <Grid
            item
            className={
              displayNegotiation
                ? classes.rejectAndNegotiateUpArrow
                : classes.rejectAndNegotiateDownArrow
            }
          ></Grid>
        </Grid>
      </Grid>
      {displayNegotiation && (
        <Grid item>
          <CardMedia
            image={rejectAndNegotiateCloseX}
            className={`${classes.rejectAndNegotiateX} ${classes.rejectAndNegotiateToggle}`}
            onClick={toggleNegotiationDisplay}
          />
        </Grid>
      )}
      {displayNegotiation && (
        <Grid container>
          <Grid item className={classes.rejectAndNegotiateText}>
            <Typography item variant="subtitle1" color="textSecondary">
              In the case you can&apos;t meet the requirements of the purchase
              order, you may negotiate the quantity and set a delivery date of
              the remaining items.
            </Typography>
          </Grid>

          <CardContent className={classes.inputContainer}>
            <OrderQuantityInput
              handleChange={handleChange}
              label="Proposed Quantity:"
              quantity={quantity}
              errorMessage={quantityError}
            />
            <OrderDeliveryByDatePicker
              handleChange={handleChange}
              label="Delivery date of remaining items:"
              errorMessage={deliveryByError}
            />
          </CardContent>
          <RejectOrderAction
            order={order}
            quantity={quantity}
            deliveryBy={deliveryBy}
            formReady={isFormReady()}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default Negotiate
