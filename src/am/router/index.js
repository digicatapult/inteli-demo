import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Orders from '../components/Orders'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/orders" />} />
      <Route path="/app/orders" element={<Orders />} />
      <Route path="/app/orders/:orderId" element={<Orders />} />
    </Routes>
  )
}

export default Routing
