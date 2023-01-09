import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";

const Quizee = () => {
  const { user } = useAuth();

  return user && user.role !== "quizzer" ? <Outlet /> : <Navigate to={"/quizzer"} />;
};

export default Quizee;
