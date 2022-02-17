import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { upsertLabTest } from './labTestsSlice'
import { upsertOrder } from './ordersSlice'
import { upsertPowder } from './powdersSlice'
import { PromiseStateFactory } from './utils'
import Api from '../utils/vitalamApi'

const upsertMap = {
  ORDER: (token, dispatch) => dispatch(upsertOrder(token)),
  LAB_TEST: (token, dispatch) => dispatch(upsertLabTest(token)),
  POWDER: (token, dispatch) => dispatch(upsertPowder(token)),
}

const getLatestToken = async ({ getState }) => {
  const id = await Api()
    .latestToken()
    .then((res) => res.id)
  if (!id) {
    throw new Error(`there are no tokens to fetch. Latet: ${id}`)
  }

  const last = getState()?.tokens?.last
  if (id === last?.id) {
    return {
      last,
      latestToken: last,
    }
  } else {
    return {
      latestToken: await Api().tokenById(id),
      last,
    }
  }
}

const getRefToken = async (token, position, tokens = []) => {
  const isRef = token.metadata.type === 'REFERENCE'
  const isFirst = token.id === 1 || position + 1 === token.id
  const data = [...tokens, token]

  if (isFirst || isRef) {
    return {
      ref: isRef ? token : tokens.ref || undefined,
      data,
      newPosition: token.id + tokens.length,
    }
  } else {
    const prevToken = await Api().tokenById(token.id - 1)
    return getRefToken(prevToken, position, data)
  }
}

const getData = async (last = { id: 1 }, tokens = {}, position) => {
  if (!position || last.id > position) {
    const { newPosition, data, ref } = await getRefToken(last, position)

    return await getData(
      last,
      { ...tokens, data: [...data, ...(tokens?.data || [])], ref },
      newPosition
    )
  }

  if (position < last.id) {
    const newToken = await Api().tokenById(position + 1)
    const updatedTokens = { ...tokens, data: [...tokens.data, newToken] }

    return getData(last, updatedTokens, position + 1)
  }

  return { ...tokens, last }
}

// this is a helper function to temporarly address current setup
// only new tokens will call upsert actions
const upsertTokens = (tokens = [], dispatch) => {
  tokens.forEach((token) => {
    const type = token.metadata.type
    if (['ORDER', 'LAB_TEST', 'POWDER'].includes(type)) {
      upsertMap[type](token, dispatch)
    }
  })
}

// this thunk is for fetching new tokens and storing to localstorage
const fetchTokens = createAsyncThunk('tokens/fetch', async (action, store) => {
  try {
    const { latestToken, last } = await getLatestToken(store)
    const tokens = store.getState().tokens || {}
    const newData = await getData(latestToken, {}, last?.id, store)
    // upsert only new tokens
    upsertTokens(newData.data, store.dispatch)
    return {
      ...newData,
      data: [...(newData?.data || []), ...tokens.data],
    }
  } catch (e) {
    console.error('Error occured fetching tokens: ', e)
  }
})

// init fn that reads localstorage and sorts tokens by order/powder/etc
const initTokens = createAsyncThunk('tokens/init', async (action, store) => {
  try {
    const { tokens } = store.getState()
    const { latestToken, last } = await getLatestToken(store, tokens)
    const res = await getData(latestToken, tokens, last?.id)

    upsertTokens(res.data, store.dispatch)

    return {
      ...tokens,
      ...res,
      data: res.ref
        ? res.data.filter((token) => token.id > res.ref.id)
        : res.data,
    }
  } catch (e) {
    console.error('Error occured during init stage: ', e)
  }
})

const tokens = createSlice({
  name: 'tokens',
  initialState: { isFetching: true, isError: false, data: [] },
  reducers: {
    addRef: {
      reducer(state, { payload }) {
        const { id } = payload

        return {
          ...state,
          ref: payload,
          data: [...state.data, payload].filter((token) => token.id > id),
        }
      },
    },
    update: {
      reducer(state, { payload }) {
        state = {
          ...state,
          ...payload,
          data: [...state.data, ...(payload.data || [])],
        }
      },
    },
  },
  extraReducers: (builder) => {
    PromiseStateFactory.forEach((addCase) => addCase(builder, initTokens))
    PromiseStateFactory.forEach((addCase) => addCase(builder, fetchTokens))
  },
})

// exports
const { actions, reducer } = tokens
const { update, addRef } = actions

export { initTokens, fetchTokens, update, addRef, upsertTokens }

export default reducer
