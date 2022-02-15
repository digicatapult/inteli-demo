import React from 'react'
import CustomerPartItem from './CustomerPartItem'
import { Grid } from '@material-ui/core'
import uniqid from 'uniqid'

const CustomerPartItems = ({ items }) => {
  return (
    <Grid container item direction="row" spacing={2} justify="flex-start">
      {items.map((item) => (
        <Grid item key={uniqid()}>
          <CustomerPartItem {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CustomerPartItems
