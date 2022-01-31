import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import EmptyPageWrapper from './EmptyPageWrapper'
import LabTestDetails from './LabTestDetails'
import LabTestsItem from './LabTestsItem'
import LabTestsItemsWrapper from './LabTestsItemsWrapper'
import LabTestsSearch from './LabTestsSearch'
import LabTestsWrapper from './LabTestsWrapper'
import { identities, tokenTypes, powderTestStatus } from '../../utils'

const Tested = () => {
  const selectedId = useParams().testId * 1 || null
  const laboratoryTests = useSelector((state) =>
    state.labTests.filter(
      ({ roles, metadata: { type, status } }) =>
        type === tokenTypes.powderTest &&
        status === powderTestStatus.result &&
        roles.Owner === identities.am // temp, change to roles.lab === identities.current when PowderTestRequest updated with new roles
    )
  )
  const selectedTest = laboratoryTests.find((l) => l.original_id === selectedId)
  return (
    <>
      {laboratoryTests.length ? (
        <LabTestsWrapper>
          <Grid item xs={1} />
          <Grid item xs={4} xs-offset={1} spacing={1}>
            <LabTestsSearch />
            <LabTestsItemsWrapper>
              {laboratoryTests.reverse().map((test) => (
                <LabTestsItem key={test.id} selectedId={selectedId} {...test} />
              ))}
            </LabTestsItemsWrapper>
          </Grid>
          <Grid item xs={6} xs-offset={1} spacing={1}>
            {selectedTest ? <LabTestDetails {...selectedTest} /> : null}
          </Grid>
          <Grid item xs={1} />
        </LabTestsWrapper>
      ) : (
        <EmptyPageWrapper>No items found...</EmptyPageWrapper>
      )}
    </>
  )
}

export default Tested
