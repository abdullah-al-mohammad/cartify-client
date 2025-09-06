import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="loading loading-spinner loading-xl"></progress>
      </div>
    );
  }

  if (user && isAdmin) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
