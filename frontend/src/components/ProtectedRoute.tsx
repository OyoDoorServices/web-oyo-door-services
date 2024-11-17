import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface props {
  isAuthenticated: boolean;
  children?: ReactElement;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
  orders?: boolean;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  orders,
  redirect = "/",
}: props) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (!orders && !isAuthenticated) return <Navigate to={redirect} />;
  if (adminRoute && !isAdmin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
