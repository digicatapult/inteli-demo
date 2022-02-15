import React, { useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useSelector } from 'react-redux'

import SearchField from './SearchField'
import CustomerPartItems from './CustomerPartItems'

const useStyles = makeStyles({
  searchFieldContainer: {
    marginBottom: 8,
  },
  searchResultsTotal: {
    marginTop: 16,
  },
})

const CustomerParts = () => {
  const customerParts = useSelector((state) => state.customerParts)
  const classes = useStyles()

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
    <Box>
      <Grid
        container
        direction="row"
        className={classes.searchFieldContainer}
        justify="flex-start"
      >
        <Grid item xs={11}>
          <SearchField handleChange={searchBy} />
        </Grid>
        <Grid item xs={1} className={classes.searchResultsTotal}>
          <Typography color="textSecondary">
            {customerParts && customerParts.length ? filteredParts.length : 0}{' '}
            results
          </Typography>
        </Grid>
      </Grid>
      {getParts()}
    </Box>
  )
}

export default CustomerParts
