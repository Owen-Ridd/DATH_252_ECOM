import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;