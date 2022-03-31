import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Orders from '../components/Orders'
import PrivateRoute from '../../shared/PrivateRoute'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/orders" />} />
      <Route path="/app/orders" element={<PrivateRoute component={Orders} />} />
      <Route
        path="/app/orders/:orderId"
        element={<PrivateRoute component={Orders} />}
      />
    </Routes>
  )
}

export default Routing
