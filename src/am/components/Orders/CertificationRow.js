import React, { useState } from 'react'
import { CardMedia, Paper, Typography, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDropzone } from 'react-dropzone'

import removeUploadX from '../../../images/close-x-icon.svg'
import tick from '../../../images/tick.svg'
import pending from '../../../images/pending.svg'
import cloud from '../../../images/cloud.svg'
import CertificationDownload from './CertificationDownload'

const useStyles = makeStyles({
  root: {
    padding: '8px 0px',
    width: '100%',
  },
  rowItem: {
    display: 'flex',
    alignItems: 'center',
    height: '36px',
  },
  clickable: {
    cursor: 'pointer',
  },
  icon: {
    display: 'block',
    margin: 'auto',
    width: '16px',
    height: '16px',
  },
  dnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: '#F8F8F8',
    border: '1px dashed #CCCCCC',
    borderRadius: '4px',
    height: '100%',
  },
  dndText: {
    textDecoration: 'underline',
  },
})

const CertificationRow = ({
  metadata,
  requiredCert,
  setParentFile,
  forgetParentFile,
}) => {
  const { metadataKey, description } = requiredCert
  const classes = useStyles()

  const fileOnChain = metadata[metadataKey]
  const [file, setFile] = useState(fileOnChain)

  const removeUpload = () => {
    setFile(null)
    // only set to delete on chain if the file exists on chain
    if (fileOnChain) {
      setParentFile({ [metadataKey]: null })
    } else {
      forgetParentFile(metadataKey)
    }
  }

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
        const fileObj = {
          blob: blob,
          fileName: name,
          url: url,
        }
        setFile(fileObj)
        setParentFile({ [metadataKey]: fileObj })
      }
      reader.readAsArrayBuffer(file)
    },
  })

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={1} className={classes.rowItem}>
          {file ? (
            <img src={tick} className={classes.icon} />
          ) : (
            <img src={pending} className={classes.icon} />
          )}
        </Grid>
        <Grid item xs={8} className={classes.rowItem}>
          <Typography>{description}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.rowItem}>
          {file ? (
            <CertificationDownload name={file.name} downloadData={file.url} />
          ) : (
            <Grid
              container
              direction="column"
              className={classes.dnd}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Grid item xs={6}>
                <img src={cloud} className={`${classes.icon}`} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" className={classes.dndText}>
                  {'Upload'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} className={classes.rowItem}>
          {file && (
            <CardMedia
              image={removeUploadX}
              className={`${classes.icon} ${classes.clickable}`}
              onClick={removeUpload}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CertificationRow
