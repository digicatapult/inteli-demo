import tokenTypes from './tokenTypes'
import Api from './vitalamApi'
import { addRef } from '../features/tokensSlice'
import { metadataTypes } from './'
import { resetOrder } from '../features/ordersSlice'
import { resetCustomerParts } from '../features/partsSlice'
import { resetLabTest } from '../features/labTestsSlice'
import { resetPowder } from '../features/powdersSlice'

// create new form data for the new ref token
// TODO we are using this across the board
// convert into a shared util
const createFormData = (inputs, roles, metadata) => {
  const formData = new FormData()
  const outputs = [
    {
      roles,
      metadata: {
        type: { type: metadataTypes.literal, value: metadata.type },
        name: { type: metadataTypes.literal, value: metadata.name },
      },
    },
  ]

  formData.set(
    'request',
    JSON.stringify({
      inputs,
      outputs,
    })
  )

  return formData
}

const createRefToken = async (name, dispatch) => {
  const roles = { Owner: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty' } // TODO get correct owner
  const metadata = {
    type: tokenTypes.reference,
    name: name,
  }

  const formData = createFormData([], roles, metadata)
  const response = await Api().runProcess(formData)
  const token = {
    id: response[0],
    roles,
    metadata,
  }

  dispatch(addRef(token))
  dispatch(resetOrder())
  dispatch(resetCustomerParts())
  dispatch(resetLabTest())
  dispatch(resetPowder())
}

export default createRefToken
