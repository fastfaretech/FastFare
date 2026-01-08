import { Navigate } from "react-router-dom";
import type { UserRole } from "../utils/getUserRole";
import { getUserRole } from "../utils/getUserRole";
import type { JSX } from "react";

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

const RoleProtectedRoute = ({
  allowedRoles,
  children,
}: RoleProtectedRouteProps) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
