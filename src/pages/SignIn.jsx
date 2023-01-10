import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth, setUser } from "../features/slice/authSlice";
import AuthContainer from "../layouts/AuthContainer";
import { useAuthorizeUserMutation } from "../services/user";
import SignInForm from "../components/SignIn/SignInForm";

const SignIn = () => {
  const dispatch = useDispatch();
  const [authorizeUser, result] = useAuthorizeUserMutation();
  const { data, isSuccess } = result;
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const inputFields = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "password",
      type: showPass ? "text" : "password",
      placeholder: "Password",
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data));
      dispatch(setUser(data));
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const submitAction = (values, { resetForm }) => {
    authorizeUser({ authData: values });
    resetForm();
  };

  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <AuthContainer>
      <h1>Sign In</h1>
      <SignInForm
        inputFields={inputFields}
        onSubmit={submitAction}
        onTogglePass={toggleShowPass}
        togglePass={showPass}
      />
    </AuthContainer>
  );
};

export default SignIn;
