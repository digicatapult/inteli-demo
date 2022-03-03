import { createSlice } from '@reduxjs/toolkit'

export const LAST_TOKEN = 'lastFetchedToken'
export const REFERENCE_TOKEN = 'referenceToken'

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
  },
})

export const { actions, reducer } = referenceTokensSlice

export const { insertReferenceToken } = actions

export default reducer
