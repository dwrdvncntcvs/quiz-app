import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/slice/authSlice";
import { useGetUserQuery } from "../services/user";

const useInitializeUser = () => {
  const { data } = useGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);

    if (data) dispatch(setUser({ user: data }));
  }, [data, dispatch]);
};

export default useInitializeUser;
