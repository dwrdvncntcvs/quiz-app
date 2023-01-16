import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";
import useInitializeUser from "../hooks/useInitializeUser";

const RequiredAuth = ({ role }) => {
  useInitializeUser();
  const { user, isAuth } = useAuth();
  const location = useLocation();

  return user.role === role ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to={"/"} />
  ) : (
    <Navigate to={"/sign-in"} state={{ from: location.pathname }} />
  );
};

export default RequiredAuth;
