import React, { useState } from 'react'
import {
  Paper,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Container,
  InputLabel,
  Input,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import BackButton from './BackButton'
import { upsertOrder } from '../../features/ordersSlice'
import { useApi, identities, tokenTypes, metadataTypes, orderStatus } from '../../utils'
import Attachment from '../../laboratory/components/Attachment'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '24px',
    width: '100%',
  },
  contentDetails: {
    position: 'relative',
    borderRight: '1px #d3d3d3 solid',
    margin: '0px 24px',
  },
  backButton: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  issuePurchaseOrderButton: {
    width: 230,
    height: 42,
  },
  imagePlaceholder: {
    backgroundColor: '#ccc',
    height: 322,
  },
  inline: {
    display: 'inline',
  },
  quantityContainer: {
    width: '100%',
    margin: '32px 0px 16px 0px',
    padding: '8px 16px',
    height: '18px',
    display: 'grid',
    gridTemplateColumns: '0fr 0.25fr 0.5fr',
  },
  quantityLabel: {
    margin: '16px 24px 6px 0px',
    color: '#000',
    fontSize: '0.9rem',
  },
  quantityInput: {
    width: '120px',
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    height: '40px',
    fontSize: '0.9rem',
    padding: '16px',
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  deliveryByContainer: {
    width: '100%',
    margin: '0px 32px 8px 8px',
    padding: '8px',
    height: '48px',
    display: 'grid',
    gridTemplateColumns: '0fr 0.25fr 0.5fr',
  },
  deliveryByLabel: {
    width: '90px',
    margin: '16px 0px 0px 0px',
    padding: '0px',
    color: '#000',
    fontSize: '0.9rem',
  },
  deliveryByInput: {
    width: '120px',
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    height: '40px',
    fontSize: '0.8rem',
    padding: '16px',
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  contentForm: {
    margin: '0px 64px 0px -8px',
    padding: '0px',
  },
  rightColumn: {
    padding: '64px 0px 112px 16px',
  },
  rightColumnBottom: {
    marginTop: '96px',
  },
  partTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '32px',
  },
  shippingAddress: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  errorText: {
    color: '#ff0000',
    margin: '12px 0px',
    fontSize: '1rem',
  },
}))

const DetailRow = ({ title, value }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.inline} variant="body1">
        {title}:
      </Typography>
      &nbsp;
      <Typography className={classes.inline} variant="body2" color="textSecondary">
        {value}
      </Typography>
    </Box>
  )
}

const DATE_FORMAT = 'DD/MM/YYYY'

const CustomerPart = () => {
  const { partId: id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOrdering, setIsOrdering] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [quantityError, setQuantityError] = useState('')
  const [deliveryBy, setDeliveryBy] = useState('')
  const [deliveryByError, setDeliveryByError] = useState('')

  const selectedCustomerPart = useSelector((state) => state.customerParts.find(({ partId }) => partId === id))

  const api = useApi()

  const { image, name, material, alloy, price, partId } = selectedCustomerPart
  const totalCost = price * quantity
  const classes = useStyles()

  const createFormData = (inputs, roles, metadata, orderImageFile) => {
    const formData = new FormData()
    const outputs = [
      {
        roles,
        metadata: {
          type: { type: metadataTypes.literal, value: metadata.type },
          status: { type: metadataTypes.literal, value: metadata.status },
          orderReference: {
            type: metadataTypes.literal,
            value: metadata.orderReference,
          },
          partId: { type: metadataTypes.literal, value: metadata.partId },
          name: { type: metadataTypes.literal, value: metadata.name },
          material: { type: metadataTypes.literal, value: metadata.material },
          alloy: { type: metadataTypes.literal, value: metadata.alloy },
          price: { type: metadataTypes.literal, value: metadata.price },
          quantity: { type: metadataTypes.literal, value: metadata.quantity },
          deliveryBy: {
            type: metadataTypes.literal,
            value: metadata.deliveryBy,
          },
          orderImage: {
            type: metadataTypes.file,
            value: metadata.orderImage.fileName,
          },
        },
      },
    ]

    formData.set(
      'request',
      JSON.stringify({
        inputs,
        outputs,
      })
    )

    formData.append('files', orderImageFile.blob, orderImageFile.fileName)

    return formData
  }

  const createOrderImageFile = async (image) => {
    const response = await fetch(image)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return {
      blob: blob,
      fileName: 'orderImage.svg',
      url: url,
    }
  }

  const onChange = async () => {
    if (isFormReady()) {
      setIsOrdering(true)

      const orderImageFile = await createOrderImageFile(image)

      const roles = { Owner: identities.am }
      const metadata = {
        type: tokenTypes.order,
        status: orderStatus.submitted,
        orderReference: `#${Math.floor(Math.random() * 100000000)}`,
        partId,
        name,
        material,
        alloy,
        price: price.toString(),
        quantity: quantity.toString(),
        deliveryBy,
        orderImage: {
          fileName: orderImageFile.fileName,
          url: orderImageFile.url,
        },
      }

      const formData = createFormData([], roles, metadata, orderImageFile)
      const response = await api.runProcess(formData)
      const token = {
        id: response[0],
        original_id: response[0],
        roles,
        metadata,
      }

      dispatch(upsertOrder(token))

      navigate('/app/my-orders')
    }
  }

  const isQuantityValid = (value) => {
    return !isNaN(value) && value > 0
  }

  const setQuantityValue = (value) => {
    const quantityValue = value.replace(/\D/g, '')

    if (isQuantityValid(quantityValue)) {
      setQuantityError('')
    } else {
      setQuantityError('Must be greater than 0')
    }

    setQuantity(quantityValue)
  }

  const isDeliveryByValid = (value) => {
    if (value && value.length === 10) {
      const date = moment(value, DATE_FORMAT)

      return date.isValid() && date.isSameOrAfter(moment().startOf('day'))
    } else {
      return false
    }
  }

  const setDeliveryByValue = (value) => {
    if (isDeliveryByValid(value)) {
      setDeliveryByError('')
    } else {
      setDeliveryByError('Not before today')
    }

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
    return isQuantityValid(quantity) && isDeliveryByValid(deliveryBy)
  }

  return (
    <Container>
      <BackButton buttonClass={classes.backButton} backToLocation="/app/customer-parts" value="< Back" />

      <Paper elevation={0} className={classes.card}>
        <Grid container>
          <Grid item xs={3}>
            <CardMedia component="img" alt={name} width="450" height="322" image={image} title={name} />
          </Grid>
          <Grid container item xs={6} direction="column" justify="space-between" className={classes.contentDetails}>
            <CardContent>
              <Typography gutterBottom className={classes.partTitle}>
                {name}
              </Typography>
              <DetailRow title="Part name" value={name}></DetailRow>
              <DetailRow title="Part Number" value={id}></DetailRow>
              <DetailRow title="Material" value={material}></DetailRow>
              <DetailRow title="Alloy" value={alloy}></DetailRow>
            </CardContent>
            <Box className={classes.quantityContainer}>
              <InputLabel className={classes.quantityLabel}>*Quantity:</InputLabel>
              <Input
                className={classes.quantityInput}
                name="quantity"
                onChange={handleChange('quantity')}
                value={quantity}
              />
              <div className={classes.errorText}>{quantityError}</div>
            </Box>
            <Box className={classes.deliveryByContainer}>
              <InputLabel className={classes.deliveryByLabel}>*Delivery by:</InputLabel>
              <Input
                className={classes.deliveryByInput}
                name="deliveryBy"
                placeholder={DATE_FORMAT}
                onChange={handleChange('deliveryBy')}
              />
              <div className={classes.errorText}>{deliveryByError}</div>
            </Box>
            <Grid container item direction="column" justify="space-between">
              <CardContent className={classes.contentForm}>
                <Attachment name="Materials.pdf" />
                <Attachment name="Requirements.pdf" />
                <Attachment name="CAD" />
              </CardContent>
            </Grid>
          </Grid>
          <Grid container item xs={2} direction="column" justify="space-between" className={classes.rightColumn}>
            <Typography variant="h6">&#163;{totalCost}</Typography>
            <Box className={classes.rightColumnBottom}>
              <Typography className={classes.shippingAddress}>Shipping Address:</Typography>
              <Typography color="textSecondary">Digital Catapult</Typography>
              <Typography color="textSecondary">101 Euston Road</Typography>
              <Typography color="textSecondary">London</Typography>
              <Typography color="textSecondary">NW1 2RA</Typography>
            </Box>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              className={classes.issuePurchaseOrderButton}
              onClick={isOrdering ? null : onChange}
              disabled={!isFormReady()}
            >
              {isOrdering ? <CircularProgress color="secondary" size="30px" /> : 'ISSUE PURCHASE ORDER'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default CustomerPart
