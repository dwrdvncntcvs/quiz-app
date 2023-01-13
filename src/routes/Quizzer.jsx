import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";

const Quizzer = () => {
  const { user } = useAuth();

  return user && user.role === "quizzer" ? <Outlet /> : <Navigate to={"/"} />;
};

export default Quizzer;
