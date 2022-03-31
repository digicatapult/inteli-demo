import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'

import { upsertOrder } from '../../../features/ordersSlice'
import {
  useApi,
  identities,
  tokenTypes,
  orderStatus,
  metadataTypes,
} from '../../../utils'

const useStyles = makeStyles({
  buttonWrapper: {
    padding: '28px',
    width: '100%',
    display: 'grid',
    justifyContent: 'right',
  },
  manufactureButton: {
    width: 250,
    height: 42,
    marginTop: 16,
  },
})

const ManufactureOrderAction = ({ order }) => {
  const classes = useStyles()
  const [isAccepting, setIsAccepting] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const api = useApi()

  const createManufacturingFormData = (inputs, orderRoles, orderMetadata) => {
    const formData = new FormData()
    const outputs = [
      {
        roles: orderRoles,
        metadata: {
          type: { type: metadataTypes.literal, value: orderMetadata.type },
          status: { type: metadataTypes.literal, value: orderMetadata.status },
        },
        parent_index: 0,
      },
    ]

    formData.set('request', JSON.stringify({ inputs, outputs }))

    return formData
  }

  const mintManufacturingTokens = async () => {
    const orderRoles = {
      Owner: identities.am,
    }
    const orderMetadata = {
      type: tokenTypes.order,
      status: orderStatus.manufacturing,
    }

    const manufacturingFormData = createManufacturingFormData(
      [order.id],
      orderRoles,
      orderMetadata
    )

    const response = await api.runProcess(manufacturingFormData)

    const orderToken = {
      id: response[0],
      original_id: order.original_id,
      roles: orderRoles,
      metadata: orderMetadata,
    }

    dispatch(upsertOrder(orderToken))

    return response
  }

  const createManufacturedFormData = (inputs, orderRoles, orderMetadata) => {
    const formData = new FormData()
    const outputs = [
      {
        roles: orderRoles,
        metadata: {
          type: { type: metadataTypes.literal, value: orderMetadata.type },
          status: { type: metadataTypes.literal, value: orderMetadata.status },
        },
        parent_index: 0,
      },
    ]

    formData.set('request', JSON.stringify({ inputs, outputs }))

    return formData
  }

  const mintManufacturedToken = async (manufacturingTokenId) => {
    const roles = {
      Owner: identities.am,
    }
    const metadata = {
      type: tokenTypes.order,
      status: orderStatus.manufactured,
    }

    const manufacturedFormData = createManufacturedFormData(
      [manufacturingTokenId],
      roles,
      metadata
    )

    const response = await api.runProcess(manufacturedFormData)

    const manufacturedToken = {
      id: response[0],
      original_id: order.original_id,
      roles,
      metadata,
    }

    dispatch(upsertOrder(manufacturedToken))
  }

  const onButtonChange = async () => {
    setIsAccepting(true)

    const response = await mintManufacturingTokens()

    setTimeout(async () => {
      await mintManufacturedToken(response[0])
    }, 10000)

    navigate('/app/orders')
  }

  return (
    <Container className={classes.buttonWrapper}>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        className={classes.manufactureButton}
        disabled={order.metadata.status !== orderStatus.accepted}
        onClick={onButtonChange}
      >
        {isAccepting ? (
          <CircularProgress color="secondary" size="30px" />
        ) : (
          'Manufacture Part'
        )}
      </Button>
    </Container>
  )
}

export default ManufactureOrderAction
