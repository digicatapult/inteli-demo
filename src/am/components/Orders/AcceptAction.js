import React, { useState } from 'react'
import { CircularProgress, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'

import { upsertOrder } from '../../../features/ordersSlice'
import { identities, useApi, tokenTypes, orderStatus, metadataTypes } from '../../../utils'

const useStyles = makeStyles({
  buttonWrapper: {
    padding: '16px 32px',
    width: '100%',
    display: 'grid',
    justifyContent: 'right',
  },
  acceptButton: {
    width: 250,
    height: 42,
    backgroundColor: '#8ac1bc',
    color: '#fff',
  },
})

const AcceptAction = ({ order }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const api = useApi()

  const [isAccepting, setIsAccepting] = useState(false)

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

  const onChange = async () => {
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
  }

  return (
    <Container className={classes.buttonWrapper}>
      <Button
        size="medium"
        variant="contained"
        className={classes.acceptButton}
        onClick={isAccepting ? null : onChange}
        disabled={order.metadata.status === orderStatus.accepted}
      >
        {isAccepting ? <CircularProgress color="secondary" size="30px" /> : 'ACCEPT ORDER'}
      </Button>
    </Container>
  )
}

export default AcceptAction
