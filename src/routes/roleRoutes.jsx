import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role"); 
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
