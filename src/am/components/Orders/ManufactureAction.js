import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch, useSelector } from 'react-redux'

import { upsertOrder } from '../../../features/ordersSlice'
import {
  useApi,
  identities,
  tokenTypes,
  orderStatus,
  metadataTypes,
} from '../../../utils'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import { upsertPowder } from '../../../features/powdersSlice'

const useStyles = makeStyles({
  buttonWrapper: {
    padding: '16px 0px',
    width: '100%',
    display: 'grid',
    justifyContent: 'right',
  },
  manufactureButton: {
    width: 250,
    height: 42,
    marginTop: 16,
  },
  selectPowderWrapper: {
    padding: '24px 0px 16px 0px',
  },
  selectInputLabel: {
    fontWeight: 600,
  },
  selectInput: {
    marginTop: 16,
    padding: '0px 14px',
    border: 'solid 1px #ccc',
    width: '100%',
  },
})

const ManufactureOrderAction = ({ order }) => {
  const classes = useStyles()
  const powders = useSelector((state) => state.powders)
  const [isAccepting, setIsAccepting] = useState(false)
  const [selectedPowder, setSelectedPowder] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const api = useApi()

  const createManufacturingFormData = (
    inputs,
    orderRoles,
    orderMetadata,
    powderRoles,
    powderMetadata
  ) => {
    const formData = new FormData()
    const outputs = [
      {
        roles: orderRoles,
        metadata: {
          type: { type: metadataTypes.literal, value: orderMetadata.type },
          status: { type: metadataTypes.literal, value: orderMetadata.status },
          powderId: {
            type: metadataTypes.tokenId,
            value: orderMetadata.powderId,
          },
        },
        parent_index: 0,
      },
      {
        roles: powderRoles,
        metadata: {
          type: { type: metadataTypes.literal, value: powderMetadata.type },
          quantityKg: {
            type: metadataTypes.literal,
            value: powderMetadata.quantityKg,
          },
        },
        parent_index: 1,
      },
    ]

    formData.set('request', JSON.stringify({ inputs, outputs }))

    return formData
  }

  const mintManufacturingTokens = async () => {
    const powder = powders.find((item) => item.original_id === selectedPowder)

    const orderRoles = {
      Owner: identities.am,
    }
    const orderMetadata = {
      type: tokenTypes.order,
      status: orderStatus.manufacturing,
      powderId: powder.original_id.toString(),
    }

    const powderRoles = { Owner: identities.am }
    const powderMetadata = {
      type: tokenTypes.powder,
      quantityKg: `${powder.metadata.quantityKg - 50}`,
    }

    const manufacturingFormData = createManufacturingFormData(
      [order.id, powder.id],
      orderRoles,
      orderMetadata,
      powderRoles,
      powderMetadata
    )

    const response = await api.runProcess(manufacturingFormData)

    const orderToken = {
      id: response[0],
      original_id: order.original_id,
      roles: orderRoles,
      metadata: orderMetadata,
    }

    const powderToken = {
      id: response[1],
      original_id: powder.original_id,
      roles: powderRoles,
      metadata: powderMetadata,
    }

    dispatch(upsertOrder(orderToken))
    dispatch(upsertPowder(powderToken))

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
      roles: roles,
      metadata: metadata,
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

  const onPowderChange = async (event) => {
    setSelectedPowder(event.target.value)
  }

  return (
    <Box className={classes.selectPowderWrapper}>
      {order.metadata.status === orderStatus.accepted ? (
        <Grid container direction="column" className={classes.row}>
          <Grid item>
            <Typography variant="body2" className={classes.selectInputLabel}>
              Select a powder to assign to this order:
            </Typography>
          </Grid>
          <Grid item>
            <Select
              name="powder"
              className={classes.selectInput}
              onChange={onPowderChange}
            >
              {powders.map((item) => (
                <MenuItem key={item.original_id} value={item.original_id}>
                  {item.metadata.powderReference} ({item.metadata.material})
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      ) : null}
      <Container className={classes.buttonWrapper}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          className={classes.manufactureButton}
          disabled={selectedPowder ? false : true}
          onClick={onButtonChange}
        >
          {isAccepting ? (
            <CircularProgress color="secondary" size="30px" />
          ) : (
            'Manufacture Part'
          )}
        </Button>
      </Container>
    </Box>
  )
}

export default ManufactureOrderAction
