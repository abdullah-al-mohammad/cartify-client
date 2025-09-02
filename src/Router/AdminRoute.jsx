
import useAdmin from '../hooks/useAdmin'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin()
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading && isAdminLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <progress className="loading loading-spinner loading-xl"></progress>
    </div>
  }
  if (isAdmin && user) {
    return children
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default AdminRoute