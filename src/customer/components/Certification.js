import React from 'react'
import { Button, Grid } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PDF from '../../utils/pdf'
import CertificationRow from './CertificationRow'

const pdfKit = new PDF()
const useStyles = makeStyles({
  container: {
    padding: '24px 0px',
  },
  button: {
    backgroundColor: '#FAC473',
    borderRadius: '4px',
    textAlign: 'center',
    textDecoration: 'underline',
    textTransform: 'none',
  },
})

const Certification = ({ order }) => {
  const classes = useStyles()
  const [files, addFile] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const downloadAllHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    const header = pdfKit.generateOrderHeader(order)
    pdfKit
      .mergePDFs([header, ...files])
      .then((url) => {
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('download', `${Date.now()}.pdf`)
        a.click()
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.warn(err) // ideally it should render a modal/dialog
      })
  }

  React.useEffect(() => {
    const { requiredCerts } = order.metadata
    addFile(
      requiredCerts
        .map((cert) => {
          const { metadataKey } = cert
          const file = order.metadata[metadataKey]
          if (file) return file.url
          return null
        })
        .filter(Boolean)
    )
  }, [order.metadata])

  return (
    <Grid container className={classes.container}>
      <Grid container direction="row">
        {order.metadata.requiredCerts.map((cert) => {
          return (
            <CertificationRow
              key={cert.metadataKey}
              order={order}
              requiredCert={cert}
            />
          )
        })}
      </Grid>
      {files.length > 1 && (
        <Grid justifyContent="flex-end" container direction="row">
          <Grid item sx={3}>
            <Button
              disabled={loading}
              className={classes.button}
              onClick={(e) => downloadAllHandler(e)}
            >
              Download All
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Certification
