import React from "react";
import { useModal } from "../../features/slice/modalSlice";
import AuthContainer from "../../layouts/AuthContainer";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const { props } = useModal();

  const { role = "" } = props;
  const roleTransformed = `${role.charAt(0).toUpperCase()}${role.slice(1)}`;

  return (
    <AuthContainer>
      <h1>Sign Up</h1>
      <p>Role: {roleTransformed}</p>
      <SignUpForm />
    </AuthContainer>
  );
};

export default SignUp;
