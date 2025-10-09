import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Si hay token, renderiza hijos o el Outlet (rutas anidadas)
  return token ? (children || <Outlet />) : <Navigate to="/" />;
};

export default PrivateRoute;