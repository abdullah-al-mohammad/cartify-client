import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
      <progress className="loading loading-spinner loading-xl"></progress>
    </div>
  }
  if (user) {
    return children
  }
  return <Navigate to="/login" state={{ from: location }} replace> </Navigate>
}

export default PrivateRoute