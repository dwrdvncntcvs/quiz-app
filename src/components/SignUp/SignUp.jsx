import React from "react";
import AuthContainer from "../../layouts/AuthContainer";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <AuthContainer>
      <h1>Sign Up</h1>
      <SignUpForm />
    </AuthContainer>
  );
};

export default SignUp;
