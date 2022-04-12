import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = ({ isLogged }) => {
  return (
    (isLogged) ? <Outlet /> : <Navigate to="/login" /> 
  )
}

export default PrivateRoute