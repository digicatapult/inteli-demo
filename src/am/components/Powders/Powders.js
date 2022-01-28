import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'

import SearchField from './SearchField'
import PowderHeader from './Header'
import PowderRow from './Row'
import Header from '../Header'

const useStyles = makeStyles({
  tableHeader: {
    borderBottom: '1px lightgrey solid',
    paddingBottom: '8px',
    paddingLeft: '32px',
  },
})

const Powders = () => {
  const classes = useStyles()
  const { powders, labTests } = useSelector((state) => ({
    powders: state.powders,
    labTests: state.labTests,
  }))

  return (
    <Box>
      <Header title="Powder Inventory" />
      <SearchField />
      <PowderHeader className={classes.tableHeader} />

      <Grid container direction="column">
        {[...powders].reverse().map((powder) => {
          const labTest =
            labTests.find(
              ({ powderId }) => powderId === powder.original_id.toString()
            ) || null
          return (
            <PowderRow
              key={powder.original_id}
              powder={powder}
              labTest={labTest}
            />
          )
        })}
      </Grid>
    </Box>
  )
}

export default Powders
