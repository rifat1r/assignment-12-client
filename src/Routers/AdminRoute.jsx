import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
