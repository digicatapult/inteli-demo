import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, CardMedia, Typography } from '@material-ui/core'

import images from '../../images'

const useStyles = makeStyles({
  attachmentContainer: {
    width: '100%',
    border: '1px lightgrey solid',
    margin: '16px 24px',
    borderRadius: '8px',
    height: '48px',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
  },
  attachmentContainerItem: {
    display: 'grid',
    alignItems: 'center',
    height: '100%',
    marginRight: 'auto',
  },
  attachmentClip: {
    display: 'grid',
    alignItems: 'center',
    margin: 'auto 32px',
    width: '8px',
    height: '17px',
  },
  attachmentDownload: {
    display: 'grid',
    alignItems: 'center',
    margin: 'auto 32px',
  },
  attachmentDownloadImage: {
    width: '27px',
    height: '22px',
  },
})

const Attachment = ({ name, downloadData }) => {
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
    <Box className={classes.attachmentContainer}>
      <CardMedia
        image={images.attachmentClip}
        className={classes.attachmentClip}
      />
      <Typography className={classes.attachmentContainerItem}>
        {name}
      </Typography>
      <a href={url} download={name} className={classes.attachmentDownload}>
        <CardMedia
          image={images.attachmentDownload}
          className={classes.attachmentDownloadImage}
        />
      </a>
    </Box>
  )
}

export default Attachment
