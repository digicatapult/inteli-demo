import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { useParams, useNavigate } from 'react-router-dom'

import BackButton from './BackButton'
import PowderHeader from './Header'
import PowderStatus from './Status'
import TestDetails from './PowdersDetailsTests'
import Header from '../Header'

import { markPowderRead } from '../../../features/readPowdersSlice'
import {
  identities,
  powderTestStatus,
  tokenTypes,
  useApi,
} from '../../../utils'
import { upsertPowder } from '../../../features/powdersSlice'
import { upsertLabTest } from '../../../features/labTestsSlice'

const useStyles = makeStyles({
  header: {
    marginBottom: '100px',
  },
  backButton: {
    textDecoration: 'none',
    marginBottom: '48px',
  },
  detailContainer: {
    padding: '16px 0px',
  },
  detailHeaderContainer: {
    borderBottom: '1px lightgrey solid',
  },
  detailHeaderRow: {
    paddingBottom: '16px',
    paddingLeft: '32px',
  },
  testDetailHack: {
    width: '1426px',
    height: '990px',
  },
  formControls: {
    marginTop: '16px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
  },
  formSelect: {
    width: '615px',
  },
  actionsContainer: {
    margin: '32px',
  },
  testButton: {
    marginLeft: 'auto',
    width: 250,
    height: 56,
  },
})

const testList = [
  ['ASTM B855', 'Flow rate using the hall flowmeter funnel'],
  ['ASTM E60', 'Chemical composition analysis by spectrophotometry'],
  ['ASTM E8', 'Test methods for tension testing of metallic materials'],
  ['ASTM B822', 'Particle size distribution by light scattering'],
  ['ASTM D8090', 'Particle size analysis by image analysis methods'],
  ['ASTM B795', 'Determining the percentage of contamination of powder'],
  ['ASTM B417', 'Density of non-free-flowing powders using the carney funnel'],
  ['ASTM E1409', 'Determination of oxygen and nitrogen by Inert gas fusion'],
]

const testListBlob = new Blob([JSON.stringify(testList)], {
  type: 'application/json',
})

const testListFile = {
  blob: testListBlob,
  fileName: 'testList.json',
  url: URL.createObjectURL(testListBlob),
}

const PowdersDetail = () => {
  const { powderId: idStr } = useParams()
  const id = parseInt(idStr)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const classes = useStyles()
  const { powder, labTest } = useSelector((state) => ({
    powder: state.powders.find(({ original_id }) => id === original_id),
    labTest:
      state.labTests.find(
        ({ metadata }) => id.toString() === metadata.powderId
      ) || null,
  }))

  const api = useApi()

  useEffect(() => {
    dispatch(markPowderRead(id))
  }, [dispatch, id])

  const [isFetching, setIsFetching] = useState(false)
  const [labId, setLabId] = useState(null)

  if (!powder) return null // render nothing until token processed

  const {
    metadata: {
      powderReference,
      material,
      alloy,
      quantityKg,
      particleSizeUm,
      location,
    },
  } = powder

  const createFormData = (
    inputs,
    testRoles,
    testMetadata,
    powderRoles,
    powderMetadata
  ) => {
    const formData = new FormData()
    const outputs = [
      {
        roles: testRoles,
        metadata: {
          type: { type: 'LITERAL', value: testMetadata.type },
          status: { type: 'LITERAL', value: testMetadata.status },
          powderId: { type: 'TOKEN_ID', value: testMetadata.powderId },
          powderReference: {
            type: 'LITERAL',
            value: testMetadata.powderReference,
          },
          requiredTests: {
            type: 'FILE',
            value: testMetadata.requiredTests.fileName,
          },
        },
      },
      {
        roles: powderRoles,
        metadata: {
          type: { type: 'LITERAL', value: powderMetadata.type },
          quantityKg: { type: 'LITERAL', value: powderMetadata.quantityKg },
        },
        parent_index: 0,
      },
    ]

    formData.set('request', JSON.stringify({ inputs, outputs }))

    formData.append('files', testListFile.blob, testListFile.fileName)

    return formData
  }

  const onChange = async () => {
    setIsFetching(true)
    const testRoles = {
      Owner: labId,
      AdditiveManufacturer: identities.am,
      Laboratory: labId,
    }
    const testMetadata = {
      type: tokenTypes.powderTest,
      status: powderTestStatus.request,
      powderId: powder.original_id.toString(),
      powderReference: powderReference,
      requiredTests: {
        fileName: testListFile.fileName,
        url: testListFile.url,
      },
    }

    const powderRoles = { Owner: identities.am }
    const powderMetadata = {
      type: tokenTypes.powder,
      quantityKg: `${quantityKg - 0.05}`,
    }

    const formData = createFormData(
      [powder.id],
      testRoles,
      testMetadata,
      powderRoles,
      powderMetadata
    )
    const response = await api.runProcess(formData)

    const labTestToken = {
      id: response[0],
      original_id: response[0],
      roles: testRoles,
      metadata: testMetadata,
    }

    const powderToken = {
      id: response[1],
      original_id: powder.id,
      roles: powderRoles,
      metadata: powderMetadata,
    }

    dispatch(upsertLabTest(labTestToken))
    dispatch(upsertPowder(powderToken))

    navigate('/app/powders')
  }

  return (
    <Box>
      <Header title="Powder Inventory" />

      <Box>
        <BackButton
          buttonClass={classes.backButton}
          backToLocation="/app/powders"
          value="< Back"
        />

        <Paper elevation={0} className={classes.detailContainer}>
          <Box className={classes.detailHeaderContainer}>
            <PowderHeader className={classes.detailHeaderRow} />
            <Grid className={classes.detailHeaderRow} container direction="row">
              <Grid className={classes.rowItem} item xs>
                <Typography>{powderReference}</Typography>
              </Grid>
              <Grid className={classes.rowItem} item xs>
                <Typography>{material}</Typography>
              </Grid>
              <Grid className={classes.rowItem} item xs>
                <Typography>{alloy}</Typography>
              </Grid>
              <Grid className={classes.rowItem} item xs>
                <Typography>{quantityKg + 'kg'}</Typography>
              </Grid>
              <Grid className={classes.rowItem} item xs>
                <Typography>{particleSizeUm + 'µm'}</Typography>
              </Grid>
              <Grid className={classes.rowItem} item xs>
                <Typography>{location}</Typography>
              </Grid>
              <Grid className={classes.rowItem} item xs>
                <PowderStatus labTest={labTest} />
              </Grid>
            </Grid>
          </Box>
          <TestDetails powder={powder} tests={testList} />
          {labTest === null ? (
            <Box className={classes.actionsContainer}>
              <Typography>
                Select a company to send the samples for testing:
              </Typography>
              <Box className={classes.formControls}>
                <FormControl variant="outlined" className={classes.formSelect}>
                  <InputLabel htmlFor="testing-company-name-select">
                    Testing company name
                  </InputLabel>
                  <Select
                    native
                    onChange={(event) => {
                      setLabId(event.target.value)
                    }}
                    inputProps={{
                      name: 'testing-company-name',
                      id: 'testing-company-name-select',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={identities.lab}>TruFORM</option>
                    <option value={identities.amlab}>Aero Labs</option>
                  </Select>
                </FormControl>
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  className={classes.testButton}
                  disabled={!labId}
                  onClick={isFetching ? null : onChange}
                >
                  {isFetching ? (
                    <CircularProgress color="secondary" size="30px" />
                  ) : (
                    'SEND FOR TESTING'
                  )}
                </Button>
              </Box>
            </Box>
          ) : null}
        </Paper>
      </Box>
    </Box>
  )
}

export default PowdersDetail
