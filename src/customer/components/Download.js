import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  attachmentDownload: {
    color: '#000',
    textAlign: 'right',
  },
})

const Download = ({ name, downloadData }) => {
  const classes = useStyles()
  const [url, setURL] = useState('')

  useEffect(() => {
    setURL(downloadData)

    return () => {
      URL.revokeObjectURL(url)
      setURL('')
    }
  }, [downloadData, url])

  return (
    <Box>
      <a href={url} download={name} className={classes.attachmentDownload}>
        <Typography variant="body2">Download PDF</Typography>
      </a>
    </Box>
  )
}

export default Download
