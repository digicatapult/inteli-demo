import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { upsertOrder } from '../features/ordersSlice'
import { upsertPowder } from '../features/powdersSlice'
import { upsertLabTest } from '../features/labTestsSlice'
import useApi from '../utils/vitalamApi'
import { tokenTypes } from '../utils'

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  // TODO replace lastProcessedId with lastFetchedToken
  // more details in src/index.js comments
  // const { lastFetchedToken } = useSelector((state) => state.tokens)
  const lastProcessedId = useRef(1)
  const api = useApi()

  // a helper function to keep useEffect cleaner
  const upsertToken = (token) => {
    const { metadata } = token
    if (tokenTypes.order === metadata.type) dispatch(upsertOrder(token))
    if (tokenTypes.powder === metadata.type) dispatch(upsertPowder(token))
    if (tokenTypes.powderTest === metadata.type) dispatch(upsertLabTest(token))
  }

  useEffect(() => {
    // Old implementation, as we agreed this will become a new story to refactor
    // once we have got auth and other elements in (more comments in src/index.js)
    const pollFunction = async (current = 1) => {
      let latestId = null
      try {
        latestId = await api.latestToken().then((res) => res.id)
        if (current < latestId) {
          const token = await api.tokenById(current)
          upsertToken(token)
          // returning without await because then it will fetched in parallel'is
          return pollFunction(current + 1)
        }
        console.info(`Polling is complete.\nCurrent Index -> ${current}`)
        lastProcessedId.current = current
      } catch (e) {
        console.error('Error occured while fetching tokens: ', e)
      }
    }

    const timer = setTimeout(() => pollFunction(lastProcessedId.current), 5000)

    // The clean-up function clears the timer (as expected) but also sets it to null to indicate to the
    // `pollFunc` that this specific effect instantiation has been canceled
    return () => {
      clearTimeout(timer)
    }
  }, [api, dispatch]) // effect sensitivities.

  return <>{children}</>
}

export default BlockchainWatcher
