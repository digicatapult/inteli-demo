import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import moment from 'moment'
import { Box, CardMedia, Typography } from '@material-ui/core'

import images from '../../../images'

const useStyles = makeStyles({
  labelContainer: {
    width: '100%',
    border: '1px lightgrey dashed',
    margin: '16px 0px',
    borderRadius: '8px',
    height: '144px',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
  labelLeft: {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content',
    paddingTop: '16px',
    paddingLeft: '32px',
    columnGap: '8px',
    borderRight: '1px lightgrey dashed',
  },
  labelLogo: {
    display: 'grid',
    width: '139px',
    height: '40px',
    justifyContent: 'center',
    filter: 'invert() contrast(10%)',
  },
  attachmentDownload: {
    display: 'grid',
    alignItems: 'center',
    margin: 'auto 32px',
    width: '27px',
    height: '22px',
  },
  labelRight: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: '16px 32px',
    columnGap: '8px',
  },
  printLabelButton: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    width: '100%',
    marginTop: '16px',
    border: '1px black solid',
    borderRadius: '8px',
  },
})

const Attachment = ({
  powder: {
    metadata: { powderReference, material, alloy },
  },
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.labelContainer}>
      <Box className={classes.labelLeft}>
        <CardMedia image={images.logoAM} className={classes.labelLogo} />
      </Box>
      <Box className={classes.labelRight}>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            Powder ID: {powderReference}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Alloy: {material} {alloy}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Weight: 0.05kg
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            Sent:
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {moment().format('DD/MM/yyyy')}
          </Typography>
          <Box className={classes.printLabelButton}>
            <Typography>PRINT LABEL</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Attachment
