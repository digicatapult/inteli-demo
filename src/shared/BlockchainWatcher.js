import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useApi from '../utils/vitalamApi'

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const { lastFetchedToken } = useSelector((state) => state.tokens)
  /* not sure if this will work, but the idea is to listen for state changes rather than setTimeout */
  const customerOrders = useSelector((state) => state.customerOrders)
  const customerParts = useSelector((state) => state.customerParts)
  const powders = useSelector((state) => state.powders)
  const [latestTokenId, setLatestTokenId] = React.useState(null)
  const api = useApi()
  const dispatch = useDispatch()

  useEffect(() => {
    const recursive = async (currentId) => {
      try {
        if (latestTokenId === null) {
          const latest = await api.latestToken()
          setLatestTokenId(latest)
        }
        if (currentId < latestTokenId) {
          await api.tokenById(currentId)
          return recursive(currentId + 1)
        }
        setLatestTokenId(null)
        console.info(`Fetching is complete.\nCurrent Index -> ${currentId}`)
      } catch (e) {
        console.error('Error occured while fetching tokens: ', e)
      }
    }

    recursive(lastFetchedToken.id + 1)
  }, [dispatch, lastFetchedToken, customerOrders, powders, customerParts]) // effect sensitivities.

  return <>{children}</>
}

export default BlockchainWatcher
