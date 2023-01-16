import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../features/slice/authSlice";
import { useGetUserQuery } from "../services/user";

const useInitializeUser = () => {
  const token = localStorage.getItem("at");
  const userData = localStorage.getItem("u");
  const { data } = useGetUserQuery("", {
    skip: userData,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userData) {
      const user = JSON.parse(userData);

      dispatch(setUser({ user }));
      dispatch(setAuth({ accessToken: token }));
    } else {
      if (data) dispatch(setUser({ user: data }));
    }
  }, [data, dispatch, token, userData]);
};

export default useInitializeUser;
