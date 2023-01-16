import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";
import useInitializeUser from "../hooks/useInitializeUser";

const Persistence = () => {
  const [isLoading, setIsLoading] = useState(true);
  useInitializeUser();
  const { isAuth, token } = useAuth();

  useEffect(() => {
    if (isAuth && token) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isAuth, token]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default Persistence;
