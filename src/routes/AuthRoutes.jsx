import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";

const AuthRoutes = () => {
  const { isAuth } = useAuth();
  const { state } = useLocation();

  return !isAuth ? <Outlet /> : <Navigate to={state?.from ?? "/"} />;
};

export default AuthRoutes;
