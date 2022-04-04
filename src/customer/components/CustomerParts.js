import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

import SearchField from './SearchField'
import CustomerPartItems from './CustomerPartItems'
import Spacer from '../../shared/Spacer'

const CustomerParts = () => {
  const customerParts = useSelector((state) => state.customerParts)
  const [filteredParts, setFilteredParts] = useState(customerParts)
  const [searchReady, setSearchReady] = useState(false)
  const [search, setSearch] = useState('')

  const searchBy = (e) => {
    setSearchReady(true)

    const searchValue = e.target.value
    setSearch(searchValue)

    const result = customerParts.filter((part) => {
      const { name, partId, material, alloy } = part

      if (
        name.toLowerCase().includes(searchValue.toLowerCase()) ||
        partId.includes(searchValue) ||
        material.toLowerCase().includes(searchValue.toLowerCase()) ||
        alloy.toLowerCase().includes(searchValue.toLowerCase())
      )
        return part
    })

    setFilteredParts(result)
  }

  const getParts = () => {
    const items = searchReady ? filteredParts : customerParts

    if (searchReady && filteredParts.length === 0) {
      return (
        <div style={{ margin: '32px 0px' }}>
          <i>No results found for &ldquo; {search} &ldquo;</i>
        </div>
      )
    }

    return <CustomerPartItems items={items} />
  }

  return (
    <Grid container direction="column" justiifyContent="center">
      <Grid container direction="row" justifyContent="center">
        <Spacer height={6} />
        <Grid item xs={10}>
          <SearchField handleChange={searchBy} />
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            {customerParts && customerParts.length ? filteredParts.length : 0}{' '}
            results
          </Typography>
        </Grid>
        <Spacer />
        <Grid container item xs={10} spacing={2}>
          {getParts()}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CustomerParts
