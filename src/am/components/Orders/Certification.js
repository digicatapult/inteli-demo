import React, { useState } from 'react'
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CertificationRow from './CertificationRow'
import { upsertOrder } from '../../../features/ordersSlice'
import { identities, useApi, tokenTypes } from '../../../utils'
import { createOutput, request } from '../../../utils/runProcessFormat'

const useStyles = makeStyles({
  container: {
    padding: '24px 28px',
  },
  title: {
    margin: '24px 0px',
  },
  buttonWrapper: {
    margin: '40px 0px',
    display: 'grid',
  },
  submitButton: {
    width: 128,
    height: 42,
    backgroundColor: '#8ac1bc',
    color: '#fff',
  },
})

const Certification = ({ order }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const api = useApi()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [certificateFileChanges, setCertificateFileChanges] = useState({})

  const setFile = (file) => {
    setCertificateFileChanges((prev) => ({ ...prev, ...file }))
  }

  const forgetFile = (key) => {
    const { [key]: _, ...rest } = certificateFileChanges
    setCertificateFileChanges(rest)
  }

  const onSubmit = async () => {
    setIsSubmitting(true)

    const files = Object.fromEntries(
      Object.entries(certificateFileChanges).filter(([, value]) => {
        return value !== null
      })
    )
    const nones = Object.keys(certificateFileChanges).filter((key) => {
      return certificateFileChanges[key] === null
    })

    const roles = { Owner: identities.am }
    const { metadata, output } = createOutput({
      roles,
      metadata: {
        files,
        literals: { type: tokenTypes.order },
        nones,
      },
      parentIndex: 0,
    })

    const formData = request({
      inputs: [order.id],
      outputs: [output],
      filesToAttach: files,
    })

    const response = await api.runProcess(formData)
    const token = {
      id: response[0],
      original_id: order.original_id,
      roles,
      metadata,
    }
    dispatch(upsertOrder(token))

    navigate('/app/orders/' + token.id)
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.container}
    >
      <Typography variant="subtitle2" className={classes.title}>
        Upload Certifications
      </Typography>
      <Grid container direction="row">
        {order.metadata.requiredCerts.map((cert) => {
          return (
            <CertificationRow
              key={cert.metadataKey}
              metadata={order.metadata}
              requiredCert={cert}
              setParentFile={setFile}
              forgetParentFile={forgetFile}
            />
          )
        })}
      </Grid>
      <Container className={classes.buttonWrapper}>
        <Button
          variant="contained"
          className={classes.submitButton}
          disabled={Object.keys(certificateFileChanges).length === 0}
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <CircularProgress color="secondary" size="30px" />
          ) : (
            'Submit All'
          )}
        </Button>
      </Container>
    </Grid>
  )
}

export default Certification
