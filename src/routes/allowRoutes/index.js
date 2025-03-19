import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ element, allowedRoles, allowDepartments }) => {
  const userRole = localStorage.getItem("role");
  const department = localStorage.getItem("department");

  if (
    !allowedRoles.includes(userRole) ||
    !allowDepartments.includes(Number(department))
  ) {
    return <Navigate to="/not-authorized" />;
  }

  return element;
};

export default RoleProtectedRoute;
