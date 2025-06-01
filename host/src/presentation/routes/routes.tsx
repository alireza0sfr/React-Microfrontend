import { Routes, Route } from 'react-router-dom'

import CustomerApp from 'customer/App'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerApp />} />
    </Routes>
  )
}