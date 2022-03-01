import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { upsertOrder } from '../features/ordersSlice'
import { upsertPowder } from '../features/powdersSlice'
import { upsertLabTest } from '../features/labTestsSlice'

import { useApi, tokenTypes } from '../utils'

const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const lastProcessedId = useRef(0)
  const api = useApi()

  // This effect manages the polling for new tokens
  useEffect(() => {
    let timer = undefined
    const upsertToken = (token, type) => {
      if (tokenTypes.order === type) dispatch(upsertOrder(token))
      if (tokenTypes.powder === type) dispatch(upsertPowder(token))
      if (tokenTypes.labTests === type) dispatch(upsertLabTest(token))
    }

    const pollFunc = async () => {
      const { id: latestToken } = await api.latestToken()

      if (latestToken > lastProcessedId.current) {
        for (let i = lastProcessedId.current + 1; i <= latestToken; i++) {
          const token = await api.tokenById(i)

          if (timer === null) {
            return null
          }

          upsertToken(token, token.metadata.type)
          lastProcessedId.current = i
        }
      }
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
        timer = setTimeout(timerFn, 1000)
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
