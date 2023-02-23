import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { upsertOrder, resetOrders } from '../features/ordersSlice'
import { resetReadOrders } from '../features/readOrdersSlice'

import { useApi, tokenTypes } from '../utils'

const BlockchainWatcher = ({ latestToken, children }) => {
  const dispatch = useDispatch()
  const lastProcessedId = useRef(latestToken)
  const api = useApi()

  // This effect manages the polling for new tokens
  useEffect(() => {
    let timer = undefined
    const upsertToken = (token, type) => {
      if (tokenTypes.order === type) dispatch(upsertOrder(token))
    }

    const pollFunc = async () => {
      const { id: latestToken } = await api.latestToken()

      if (latestToken === lastProcessedId.current) {
        return
      }

      if (latestToken > lastProcessedId.current) {
        for (let i = lastProcessedId.current + 1; i <= latestToken; i++) {
          const token = await api.tokenById(i)

          if (timer === null) {
            return null
          }

          upsertToken(token, token.metadata.type)
          lastProcessedId.current = i
        }

        return
      }

      dispatch(resetOrders())
      dispatch(resetReadOrders())
      lastProcessedId.current = 0
    }

    // poll the blockchain. If after the pollFunc the timer has not been set to null
    // we should continue to loop. This is the general behaviour if there are no new tokens
    const timerFn = async () => {
      try {
        await pollFunc()
      } catch (err) {
        console.error(
          `Error polling for blockchain state. Error was ${
            `"${err.message}"` || JSON.stringify(err, null, 2)
          }`
        )
      }
      if (timer !== null) {
        timer = setTimeout(timerFn, 500)
      }
    }
    timer = setTimeout(timerFn, 0)

    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [dispatch, api])

  return <>{children}</>
}

export default BlockchainWatcher
