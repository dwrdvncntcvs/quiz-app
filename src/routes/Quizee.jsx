import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";

const Quizee = () => {
  const { user, isAuth } = useAuth();
  return (user && user.role !== "quizzer") || !isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/quizzer"} />
  );
};

export default Quizee;
