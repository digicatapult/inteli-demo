import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upsertOrder, updateOrderImage } from '../features/ordersSlice'
import { upsertPowder } from '../features/powdersSlice'
import { upsertLabTest } from '../features/labTestsSlice'
import {
  insertReferenceToken,
  LAST_TOKEN,
} from '../features/referenceTokensSlice'

import { useApi, tokenTypes } from '../utils'
import { sanitizeOrderImage } from '../utils/vitalamApi'

const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const { referenceTokens, customerOrders } = useSelector((state) => state)
  const [firstTime, setFirstTime] = React.useState(true)
  const lastProcessedId = useRef(referenceTokens[LAST_TOKEN].id)
  const api = useApi()

  // This effect manages the polling for new tokens
  useEffect(() => {
    let timer = undefined
    // This is temporary solution while we are going to update urls
    // to not expire upon refresh, there is a story in the backlog
    const refetchOrderImages = async () => {
      customerOrders.map(async (order) => {
        if (order.id === order.original_id) {
          try {
            const orderImage = await api.getMetadataValue(
              order.id,
              'orderImage'
            )
            dispatch(
              updateOrderImage({
                original_id: order.original_id,
                ...(await sanitizeOrderImage({ orderImage }, true)),
              })
            )
          } catch (e) {
            console.log(e)
          }
        }
      })
      setFirstTime(false)
    }

    const upsertToken = (token, type) => {
      if (tokenTypes.order === type) dispatch(upsertOrder(token))
      if (tokenTypes.powder === type) dispatch(upsertPowder(token))
      if (tokenTypes.labTests === type) dispatch(upsertLabTest(token))
      dispatch(
        insertReferenceToken({
          ...token,
          type: LAST_TOKEN,
        })
      )
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
        if (firstTime) {
          await refetchOrderImages()
        }
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
  }, [dispatch, api, customerOrders, firstTime])

  return <>{children}</>
}

export default BlockchainWatcher
