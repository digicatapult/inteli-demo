import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import { upsertOrder } from '../../features/ordersSlice'
import {
  identities,
  tokenTypes,
  orderStatus,
  useApi,
  metadataTypes,
} from '../../utils'
import { getAmendedDeliveryByFormattedDate } from '../../utils/timeline'

const useStyles = makeStyles({
  actionRowWarning: {
    color: '#C5052B',
    fontWeight: '700',
    paddingBottom: '15px',
    paddingTop: '40px',
  },
  rejectedWarningBox: {
    backgroundColor: '#ff003308',
    minHeight: '150px',
    borderLeft: '3px solid #C5052B',
    marginBottom: '60px',
  },
  proposedQuantity: {
    padding: '32px 40px 8px ',
  },
  proposedDeliveryDate: {
    paddingTop: '32px',
    paddingLeft: '40px',
  },
  proposedTextStyle: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '18.75px',
    paddingBottom: '8px',
  },
  acceptProposedButton: {
    backgroundColor: '#17AE93',
    color: '#fff',
    width: '125px',
    marginBottom: '15px',
  },
  rejectProposedButton: {
    backgroundColor: '#CCCCCC',
    color: '#fff',
    width: '125px',
  },
})

const AmendedTimeLineItem = ({ order }) => {
  const {
    metadata: { quantity, deliveryBy },
  } = order

  const dispatch = useDispatch()
  const api = useApi()
  const navigate = useNavigate()

  const classes = useStyles()
  const [isAccepting, setIsAccepting] = useState(false)

  const amendedDeliveryByFormattedDate =
    getAmendedDeliveryByFormattedDate(deliveryBy)

  const createFormData = (inputs, roles, metadata) => {
    const formData = new FormData()
    const outputs = [
      {
        roles,
        metadata: {
          type: { type: metadataTypes.literal, value: metadata.type },
          status: { type: metadataTypes.literal, value: metadata.status },
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

  const onSubmit = async () => {
    setIsAccepting(true)

    const roles = { Owner: identities.am }
    const metadata = {
      type: tokenTypes.order,
      status: orderStatus.accepted,
    }

    const formData = createFormData([order.id], roles, metadata)
    const response = await api.runProcess(formData)
    const token = { id: response[0], original_id: order.id, roles, metadata }

    dispatch(upsertOrder(token))
    navigate({
      pathname: `/app/my-orders/`,
    })
  }

  return (
    <>
      <Typography variant="subtitle2" className={classes.actionRowWarning}>
        Action Required
      </Typography>

      <Grid container className={classes.rejectedWarningBox}>
        <Grid item xs={4} className={classes.proposedQuantity}>
          <Typography variant="subtitle1" className={classes.proposedTextStyle}>
            Proposed quantity:
          </Typography>
          <Typography variant="body1">{quantity}</Typography>
        </Grid>
        <Grid item xs={5} className={classes.proposedDeliveryDate}>
          <Typography variant="subtitle1" className={classes.proposedTextStyle}>
            Delivery date of remaining items:
          </Typography>
          <Typography variant="body1">
            {amendedDeliveryByFormattedDate}
          </Typography>
        </Grid>
        <Grid item xs={3} className={classes.proposedDeliveryDate}>
          <Button
            variant="contained"
            size="medium"
            onClick={isAccepting ? null : onSubmit}
            className={classes.acceptProposedButton}
          >
            {isAccepting ? (
              <CircularProgress color="secondary" size="30px" />
            ) : (
              'Accept'
            )}
          </Button>
          <br />
          <Button
            variant="contained"
            size="medium"
            className={classes.rejectProposedButton}
          >
            Reject
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default AmendedTimeLineItem
