
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAdmin from '../hooks/useAdmin'

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin()
  const { user, loading } = useAuth()
  const location = useLocation()
  console.log(user);

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