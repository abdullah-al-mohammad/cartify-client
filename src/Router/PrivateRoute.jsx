import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="loading loading-spinner loading-xl"></progress>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location?.pathname }} replace />;
  }
  return children;
};

export default PrivateRoute;
