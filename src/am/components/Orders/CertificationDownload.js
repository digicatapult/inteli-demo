import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    cursor: 'pointer',
    backgroundColor: '#FAC473',
    borderRadius: '4px',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'underline',
  },
  attachmentDownload: {
    height: '100%',
    width: '100%',
    gridColumn: '1 / 1',
    gridRow: '1 / 1',
    zIndex: '1',
  },
  downloadText: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gridColumn: '1 / 1',
    gridRow: '1 / 1',
    zIndex: '0',
  },
})

const CertificationDownload = ({ name, downloadData }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Typography variant="subtitle2" className={classes.downloadText}>
        Download
      </Typography>
      <a
        href={downloadData}
        target="_blank"
        rel="noreferrer"
        download={name}
        className={classes.attachmentDownload}
      />
    </Box>
  )
}

export default CertificationDownload
