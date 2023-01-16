import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";

const AuthRoutes = () => {
  const { isAuth, user } = useAuth();
  return !isAuth ? (
    <Outlet />
  ) : user.role === "quizzer" ? (
    <Navigate to={"/quizzer"} />
  ) : (
    <Navigate to={"/"} />
  );
};

export default AuthRoutes;
