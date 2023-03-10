import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";
import useInitializeUser from "../hooks/useInitializeUser";

const PublicRoutes = () => {
  useInitializeUser();

  const { user } = useAuth();

  return user.role === "quizzer" ? <Navigate to="/quizzer" /> : <Outlet />;
};

export default PublicRoutes;
