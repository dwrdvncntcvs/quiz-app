import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth, setUser } from "../features/slice/authSlice";
import AuthContainer from "../layouts/AuthContainer";
import { useAuthorizeUserMutation } from "../services/user";
import SignInForm from "../components/SignIn/SignInForm";
import { toast } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const [authorizeUser, result] = useAuthorizeUserMutation();
  const { data, isSuccess, error, isError } = result;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data));
      dispatch(setUser(data));
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const submitAction = (values) => {
    authorizeUser({ authData: values });
  };

  if (isError) {
    console.log(error);
    toast.error(error.data.msg);
  }
  return (
    <AuthContainer>
      <h1>Sign In</h1>
      <SignInForm onSubmit={submitAction} />
    </AuthContainer>
  );
};

export default SignIn;
