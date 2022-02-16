import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upsertOrder } from '../features/ordersSlice'
import { upsertPowder } from '../features/powdersSlice'
import { upsertLabTest } from '../features/labTestsSlice'

import { useApi, tokenTypes } from '../utils'

// so metadata files that are svg images can be displayed, change from default MIME of 'application/octet-stream'
const svgMimeUrl = async (imageUrl) => {
  const response = await fetch(imageUrl)
  const oldBlob = await response.blob()
  const blob = new Blob([oldBlob], { type: 'image/svg+xml' })
  return URL.createObjectURL(blob)
}

// temporary version of the component that will poll the API
const BlockchainWatcher = ({ children }) => {
  const dispatch = useDispatch()
  const lastProcessedId = useRef(0)
  // orders, powders pull from redux state
  // these will change and cause a re-render when we dispatch a change in the effect
  const orders = useSelector((state) => state.customerOrders)
  const powders = useSelector((state) => state.powders)
  const labTests = useSelector((state) => state.labTests)
  const api = useApi()

  // This effect manages the polling for new tokens
  useEffect(() => {
    // will store the timeout id. This will be set for the first time lower down
    // note when this is null it means the timer has been cancelled which is caused
    // by a component render
    let timer = undefined

    const pollFunc = async () => {
      // get the latest token
      const { id: latestToken } = await api.latestToken()

      // if there are tokens to process
      if (latestToken > lastProcessedId.current) {
        // this loop is almost redundant. We will only loop more than once
        // if a token doesn't modify state
        for (let i = lastProcessedId.current + 1; i <= latestToken; i++) {
          // get the token to process
          const token = await api.tokenById(i)

          if (
            token.metadata.type === tokenTypes.order &&
            token.metadata.orderImage
          ) {
            token.metadata.orderImage.url = await svgMimeUrl(
              token.metadata.orderImage.url
            )
          }

          // if state has been modified and the effect canceled bail. The re-render will
          // generate the effect again with the correct state context. Note nothing asynchronous
          // should follow this point in the loop
          if (timer === null) {
            return
          }

          // Handle each token based on type
          switch (token.metadata.type) {
            case tokenTypes.order: {
              dispatch(
                upsertOrder({
                  id: token.id,
                  original_id: token.original_id,
                  roles: token.roles,
                  metadata: token.metadata,
                  timeStamp: token.timestamp,
                })
              )
              break
            }
            case tokenTypes.powder:
              dispatch(
                upsertPowder({
                  id: token.id,
                  original_id: token.original_id,
                  roles: token.roles,
                  metadata: token.metadata,
                })
              )
              break
            case tokenTypes.powderTest:
              dispatch(
                upsertLabTest({
                  id: token.id,
                  original_id: token.original_id,
                  roles: token.roles,
                  metadata: token.metadata,
                })
              )
              break
            default:
              console.error(`Unknown token type ${token.metadata.type}`)
          }
          // update the `lastProcessedId` now we've processed the token
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
    // kick off the timer immediately. This is important so that we can deal with multiple new tokens
    // quickly. Each new token from the blockchain will cause a redux state change that will require
    // that this effect be reset. Therefore to keep the loop going without delay this call should occur
    // straight away
    timer = setTimeout(timerFn, 0)

    // The clean-up function clears the timer (as expected) but also sets it to null to indicate to the
    // `pollFunc` that this specific effect instantiation has been canceled
    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [orders, powders, labTests, dispatch, api]) // effect sensitivities.
  // These will force the effect to be canceled when redux state changes

  return <>{children}</>
}

export default BlockchainWatcher
