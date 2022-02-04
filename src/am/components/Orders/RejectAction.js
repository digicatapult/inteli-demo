import React, { useState } from 'react'
import { CircularProgress, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateOrder } from '../../../features/ordersSlice'
import { identities, useApi } from '../../../utils'

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

  const createFormData = (inputs, file) => {
    const formData = new FormData()
    const outputs = [
      {
        owner: identities.am,
        metadataFile: 'file',
      },
    ]

    formData.set(
      'request',
      JSON.stringify({
        inputs,
        outputs,
      })
    )

    formData.set('file', file, 'file')

    return formData
  }

  const onChange = async () => {
    if (formReady) {
      setIsRejectingOrder(true)

      const fileData = {
        type: 'RejectedOrder',
        orderReference: `#${Math.floor(Math.random() * 100000000)}`,
        orderDetails: order.orderDetails,
        customerDetails: {},
        quantity,
        deliveryBy,
      }
      const file = new Blob([JSON.stringify(fileData)])
      const formData = createFormData([order.latestId], file)
      const response = await api.runProcess(formData)
      const token = { id: order.latestId, latestId: response[0], ...fileData }

      dispatch(updateOrder(token))

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
