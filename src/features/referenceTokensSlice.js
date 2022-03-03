import { createSlice } from '@reduxjs/toolkit'

export const LAST_TOKEN = 'lastFetchedToken'
export const REFERENCE_TOKEN = 'referenceToken'

const removeProperty = (key, { [key]: val, ...rest }) => rest

export const referenceTokensSlice = createSlice({
  name: 'referenceTokens',
  initialState: {
    lastFetchedToken: { id: 0 },
  },
  reducers: {
    insertReferenceToken: (state, { payload }) => {
      // type can be either last or reference
      const { type, ...token } = payload
      return {
        ...state,
        [type]: token,
      }
    },
    removeReferenceToken: (state, { payload }) => {
      const { type } = payload
      return removeProperty(type, state)
    },
  },
})

export const { actions, reducer } = referenceTokensSlice

export const { insertReferenceToken, removeReferenceToken } = actions

export default reducer
