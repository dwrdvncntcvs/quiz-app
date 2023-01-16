import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth, setUser } from "../features/slice/authSlice";
import AuthContainer from "../layouts/AuthContainer";
import { useAuthorizeUserMutation } from "../services/user";
import SignInForm from "../components/SignIn/SignInForm";
import { toast } from "react-toastify";
import AuthHeader from "../components/Auth/AuthHeader";

const SignIn = () => {
  const dispatch = useDispatch();
  const [authorizeUser, result] = useAuthorizeUserMutation();
  const { data, isSuccess, error, isError } = result;
  const navigate = useNavigate();
  const { state } = useLocation();
  
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("at", data.accessToken);
      localStorage.setItem("u", JSON.stringify(data.user));
      dispatch(setAuth(data));
      dispatch(setUser(data));
      const to = state?.from ?? "/";
      navigate(to, { replace: true, state });
      // if (data.user.role === "quizzer") navigate("/quizzer");
      // if (data.user.role === "quizee") navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate, state]);

  const submitAction = (values) => {
    authorizeUser({ authData: values });
  };

  if (isError) {
    console.log(error);
    toast.error(error.data.msg);
  }
  return (
    <AuthContainer>
      <AuthHeader title={"Sign In"} />
      <SignInForm onSubmit={submitAction} />
    </AuthContainer>
  );
};

export default SignIn;
