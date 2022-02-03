import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextareaAutosize,
  Typography,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDropzone } from 'react-dropzone'

import Attachment from './Attachment'
import images from '../../images'
import LabTestRow from './LabTestRow'
import { identities, useApi, tokenTypes, metadataTypes } from '../../utils'
import { powderTestStatus } from '../../utils/statuses'
import { upsertLabTest } from '../../features/labTestsSlice'

const useStyles = makeStyles({
  root: { marginTop: '40px', marginBottom: '40px', padding: '8px' },
  border: { border: '1px lightgrey solid', borderLeft: 0, borderRight: 0 },
  button: { width: '290px', height: '55px', margin: '20px' },
  heading: { padding: '24px 30px 8px 30px' },
  textarea: { borderColor: '#c4c4c4', margin: '10px 0', width: '95%' },
  block: { display: 'block' },
  flex: { display: 'flex' },
  dnd: { cursor: 'pointer' },
  dndText: { marginBottom: '50px' },
  dndLink: { textDecoration: 'underline', display: 'inline' },
  img: { margin: '50px auto 30px auto' },
  dndbg: {
    padding: '30px',
    cursor: 'pointer',
    '& div': { background: '#fbfbfb' },
  },
})

const LabTestDetailsEdit = ({ id }) => {
  const classes = useStyles()
  const [labTestPassOrFail, setLabTestPassOrFail] = useState('')
  const [labTestReason, setLabTestReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [reportFile, setReportFile] = useState(null)
  let reasonFile = null

  const api = useApi()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      const name = file.name
      const ext = name.split('.').slice(-1)[0]
      const images = ['png', 'gif', 'jpg']
      const type = images.includes(ext) ? 'image' : 'application'
      const reader = new FileReader()
      reader.onabort = () => console.error('File reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = () => {
        const blob = new Blob([reader.result], {
          type: type,
        })
        const url = URL.createObjectURL(blob)
        const obj = {
          blob: blob,
          fileName: name,
          url: url,
        }
        setReportFile(obj)
      }
      reader.readAsArrayBuffer(file)
    },
  })

  const handleClick = (event) => {
    setLabTestPassOrFail(event.currentTarget.value)
  }
  const handleChange = (event) => {
    setLabTestReason(event.target.value)
  }
  const createFormData = (inputs, roles, metadata) => {
    const formData = new FormData()
    const outputs = [
      {
        roles: roles,
        metadata: {
          type: { type: metadataTypes.literal, value: metadata.type },
          status: { type: metadataTypes.literal, value: metadata.status },
          overallResult: {
            type: metadataTypes.literal,
            value: metadata.overallResult,
          },
          ...(metadata.testReport
            ? {
                testReport: {
                  type: metadataTypes.file,
                  value: metadata.testReport.fileName,
                },
              }
            : {}),
          ...(metadata.testReason
            ? {
                testReason: {
                  type: metadataTypes.file,
                  value: metadata.testReason.fileName,
                },
              }
            : {}),
        },
        parent_index: 0,
      },
    ]

    formData.set('request', JSON.stringify({ inputs, outputs }))

    if (metadata.testReport) {
      formData.append('files', reportFile.blob, reportFile.fileName)
    }

    if (metadata.testReason) {
      formData.append('files', reasonFile.blob, reasonFile.fileName)
    }

    return formData
  }

  const createReasonFile = (labTestReason) => {
    if (labTestReason) {
      const blob = new Blob([labTestReason], {
        type: 'text/plain',
      })
      const url = URL.createObjectURL(blob)
      return {
        blob: blob,
        fileName: 'testReason.txt',
        url: url,
      }
    } else {
      return null
    }
  }

  const onSubmit = async () => {
    reasonFile = createReasonFile(labTestReason)

    const roles = { Owner: identities.am }
    const metadata = {
      type: tokenTypes.powderTest,
      status: powderTestStatus.result,
      overallResult: labTestPassOrFail,
      ...(reportFile
        ? { testReport: { fileName: reportFile.fileName, url: reportFile.url } }
        : {}),
      ...(reasonFile
        ? { testReason: { fileName: reasonFile.fileName, url: reasonFile.url } }
        : {}),
    }

    setIsSubmitting(true)

    const formData = createFormData([id], roles, metadata)
    const response = await api.runProcess(formData)
    const token = { id: response[0], original_id: id, roles, metadata }
    dispatch(upsertLabTest(token))

    navigate('/app/tested/' + id)
  }

  const hasFile = reportFile !== null

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid xs={12} spacing={1}>
        <Paper>
          <Grid xs={12} alignItems="center" className={classes.heading}>
            <Typography variant="h6" component="h6">
              Test results
            </Typography>
          </Grid>

          <Grid xs={12} container className={classes.border}>
            {!hasFile ? (
              <Grid xs={12} className={classes.dndbg}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Grid variant="contained" item className={classes.dnd}>
                    <img
                      src={images.dragAndDropBg}
                      className={classes.img}
                      alt
                    />
                  </Grid>
                  <Grid variant="contained" item className={classes.dnd}>
                    <Typography variant="subtitle2" className={classes.dndText}>
                      {'Drag & drop a file here or \xa0'}
                      <Typography
                        variant="subtitle2"
                        className={classes.dndLink}
                      >
                        choose files
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <>
                <Typography variant="subtitle2" className={classes.heading}>
                  Attached documents
                </Typography>
                <Attachment
                  name={reportFile.fileName}
                  downloadData={reportFile.url}
                />
              </>
            )}
          </Grid>

          <Grid xs={12} container className={classes.border}>
            <LabTestRow
              title={
                'State the result of the tests and the reasons for this result:'
              }
              value=""
            />

            <Grid xs={6} container direction="column" alignItems="center">
              <Button
                size="small"
                variant={
                  labTestPassOrFail === 'passed' ? 'contained' : 'outlined'
                }
                color="primary"
                className={classes.button}
                value="passed"
                onClick={handleClick}
              >
                Pass
              </Button>
            </Grid>
            <Grid xs={6} container direction="column" alignItems="center">
              <Button
                size="small"
                variant={
                  labTestPassOrFail === 'failed' ? 'contained' : 'outlined'
                }
                color="default"
                className={classes.button}
                value="failed"
                onClick={handleClick}
              >
                Fail
              </Button>
            </Grid>

            <Grid xs={12} container className={classes.root}>
              <LabTestRow title={'Reason:'} value="" />
              <Grid xs={12} container direction="column" alignItems="center">
                <TextareaAutosize
                  rowsMin={5}
                  rowsMax={10}
                  item
                  aria-label="maximum height"
                  placeholder="Enter reason here..."
                  className={classes.textarea}
                  onChange={handleChange}
                  name="labTestReason"
                  value={labTestReason}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="column" alignItems="center">
            <Button
              size="medium"
              variant="contained"
              color="primary"
              item
              disabled={labTestPassOrFail ? false : true}
              className={classes.button}
              onClick={onSubmit}
            >
              {isSubmitting ? (
                <CircularProgress color="secondary" size="30px" />
              ) : (
                'Submit'
              )}
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LabTestDetailsEdit
