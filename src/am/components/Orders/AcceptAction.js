import React, { useState } from 'react'
import { CircularProgress, Container } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'

import { updateOrder } from '../../../features/ordersSlice'
import { identities, useApi } from '../../../utils'

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
    setIsAccepting(true)

    const fileData = {
      type: 'AcceptedOrder',
      orderReference: order.metadata.orderReference,
    }

    const file = new Blob([JSON.stringify(fileData)])
    const formData = createFormData([order.id], file)
    const response = await api.runProcess(formData)
    const token = { id: order.id, latestId: response[0], ...fileData }

    dispatch(updateOrder(token))
  }

  return (
    <Container className={classes.buttonWrapper}>
      <Button
        size="medium"
        variant="contained"
        className={classes.acceptButton}
        onClick={isAccepting ? null : onChange}
        disabled={order.type === 'AcceptedOrder'}
      >
        {isAccepting ? (
          <CircularProgress color="secondary" size="30px" />
        ) : (
          'ACCEPT ORDER'
        )}
      </Button>
    </Container>
  )
}

export default AcceptAction
