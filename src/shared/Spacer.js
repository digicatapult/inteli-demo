import { Grid } from '@material-ui/core'
import React from 'react'

/*
  a simple spacer component that takes one prop `height` which will be multiplied by 10px
*/
const Spacer = ({ height = 2 }) => (
  <Grid item xs={12}>
    <div style={{ height: `${height * 10}px` }}></div>
  </Grid>
)

export default Spacer
