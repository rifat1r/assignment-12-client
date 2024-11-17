import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";

const TeacherRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [requestStatus, isTeacherLoading] = useTeacher();
  if (loading || isTeacherLoading) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && requestStatus) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }}></Navigate>;
};

export default TeacherRoute;
