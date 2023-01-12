import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContainer from "../layouts/AuthContainer";
import { useCreateUserMutation } from "../services/user";
import SignUpForm from "../components/SignUp/SignUpForm";
import InvalidRole from "../components/SignUp/InvalidRole";
import AuthHeader from "../components/Auth/AuthHeader";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const { role } = useParams();
  const transformedRole = `${role.charAt(0).toUpperCase()}${role.slice(1)}`;
  const navigate = useNavigate();

  const inputFields = [
    {
      name: "first_name",
      type: "text",
      placeholder: "First name",
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Last name",
    },
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
    {
      name: "confirmPassword",
      type: showPass ? "text" : "password",
      placeholder: "Confirm Password",
    },
  ];

  const [createUser, result] = useCreateUserMutation();
  const { isLoading } = result;

  const submitAction = (values, { resetForm }) => {
    const data = { ...values, role };

    createUser({ userData: data });
    resetForm();
    navigate("/sign-in");
  };

  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <AuthContainer>
      {role !== "quizzer" && role !== "quizee" ? (
        <InvalidRole role={role} />
      ) : (
        <>
          <AuthHeader title={"Sign Up"} role={transformedRole} />
          <SignUpForm
            inputFields={inputFields}
            isLoading={isLoading}
            onSubmit={submitAction}
            onTogglePass={toggleShowPass}
            togglePass={showPass}
          />
        </>
      )}
    </AuthContainer>
  );
};

export default SignUp;
