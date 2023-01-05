import React from "react";
import AuthContainer from "../../layouts/AuthContainer";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <AuthContainer>
      <h1>Sign In</h1>
      <SignInForm />
    </AuthContainer>
  );
};

export default SignIn;
