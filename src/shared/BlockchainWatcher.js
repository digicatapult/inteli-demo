import React, { useEffect } from 'react'
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
  const lastProcessedId = React.useRef(0)
  const [latestTokenId, setLatestTokenId] = React.useState(null)
  const api = useApi()

  // a helper function to keep useEffect cleaner
  const upsertToken = (token) => {
    const { metadata: { type } } = token
    if (tokenTypes.order === type) upsertOrder(token)
    if (tokenTypes.powder === type) upsertPowder(token)
    if (tokenTypes.powderTest === type) upsertLabTest(token) 
  }

  useEffect(() => {
    const pollFunction = async (lastProcessedId) => {
      try {
        if (latestTokenId === null) {
          const latest = await api.latestToken()
          setLatestTokenId(latest)
        }
        if (lastProcessedId < latestTokenId) {
          upsertToken(await api.tokenById(lastProcessedId))
          return pollFunction(lastProcessedId + 1)
        }
        setLatestTokenId(null)
        console.info(`Polling is complete.\nCurrent Index -> ${lastProcessedId}`)

        return setTimeout(pollFunction, 5000)
      } catch (e) {
        console.error('Error occured while fetching tokens: ', e)
      }
    }

    setTimeout(pollFunction, 0)

  }, [dispatch, api]) // effect sensitivities.

  return <>{children}</>
}

export default BlockchainWatcher
