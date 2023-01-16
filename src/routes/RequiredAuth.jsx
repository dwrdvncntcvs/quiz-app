import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";
import useInitializeUser from "../hooks/useInitializeUser";

const RequiredAuth = ({ role }) => {
  useInitializeUser();
  const { user } = useAuth();

  return user.role === role ? <Outlet /> : <Navigate to={"/"} />;
};

export default RequiredAuth;
