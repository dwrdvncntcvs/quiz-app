import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";

const PublicRoutes = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
