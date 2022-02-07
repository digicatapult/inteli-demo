import React, { useState } from 'react'
import { CircularProgress, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { upsertOrder } from '../../../features/ordersSlice'
import {
  identities,
  metadataTypes,
  tokenTypes,
  orderStatus,
  useApi,
} from '../../../utils'

const useStyles = makeStyles({
  buttonWrapper: {
    padding: '16px 0px 0px',
    width: '100%',
    display: 'grid',
  },
  rejectPurchaseOrderButton: {
    width: '230px',
    height: '42px',
    backgroundColor: '#484d54',
  },
})

const RejectAction = ({ order, quantity, deliveryBy, formReady }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const api = useApi()

  const [isRejectingOrder, setIsRejectingOrder] = useState(false)

  const createFormData = (inputs, roles, metadata) => {
    const formData = new FormData()
    const outputs = [
      {
        roles,
        metadata: {
          type: { type: metadataTypes.literal, value: metadata.type },
          status: { type: metadataTypes.literal, value: metadata.status },
          quantity: { type: metadataTypes.literal, value: metadata.quantity },
          deliveryBy: {
            type: metadataTypes.literal,
            value: metadata.deliveryBy,
          },
        },
        parent_index: 0,
      },
    ]

    formData.set(
      'request',
      JSON.stringify({
        inputs,
        outputs,
      })
    )

    return formData
  }

  const onChange = async () => {
    if (formReady) {
      setIsRejectingOrder(true)

      const roles = { Owner: identities.cust }
      const metadata = {
        type: tokenTypes.order,
        status: orderStatus.amended,
        quantity: quantity.toString(),
        deliveryBy,
      }

      const formData = createFormData([order.id], roles, metadata)
      const response = await api.runProcess(formData)
      const token = {
        id: response[0],
        original_id: order.original_id,
        roles,
        metadata,
      }

      dispatch(upsertOrder(token))

      navigate('/app/orders')
    }
  }

  return (
    <Container className={classes.buttonWrapper}>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        className={classes.rejectPurchaseOrderButton}
        onClick={isRejectingOrder ? null : onChange}
        disabled={!formReady}
      >
        {isRejectingOrder ? (
          <CircularProgress color="secondary" size="30px" />
        ) : (
          'SEND NEGOTIATION'
        )}
      </Button>
    </Container>
  )
}

export default RejectAction
