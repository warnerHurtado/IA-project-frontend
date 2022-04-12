import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PublicRoutes = ({ isLogged }) => {
  return (
    (!isLogged) ? <Outlet /> : <Navigate to="/home" />
  )
}

export default PublicRoutes