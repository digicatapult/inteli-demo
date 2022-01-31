import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import SearchField from './SearchField'
import TestRow from './Row'
import TestDetail from './Detail'
import Header from '../Header'

import { tokenTypes, powderTestStatus } from '../../../utils'

const LabTests = () => {
  const params = useParams()
  const labTests = useSelector((state) =>
    state.labTests.filter(
      ({ metadata: { type, status } }) =>
        type === tokenTypes.powderTest && status === powderTestStatus.result
    )
  )

  const selectedTest = params.testId
    ? labTests.find(({ id }) => `${id}` === params.testId)
    : null

  return (
    <Box>
      <Header title="Test Results" />
      <Grid container direction="row">
        <Grid container direction="column" item xs={5}>
          <SearchField />
          {[...labTests].reverse().map((test) => (
            <TestRow key={test.id} test={test} />
          ))}
        </Grid>
        <Grid item xs={7}>
          {selectedTest ? <TestDetail test={selectedTest} /> : null}
        </Grid>
      </Grid>
    </Box>
  )
}

export default LabTests
