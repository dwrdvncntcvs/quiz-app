import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContainer from "../layouts/AuthContainer";
import { useCreateUserMutation } from "../services/user";
import SignUpForm from "../components/SignUp/SignUpForm";
import InvalidRole from "../components/SignUp/InvalidRole";
import AuthHeader from "../components/Auth/AuthHeader";

const SignUp = () => {
  const { role } = useParams();
  const transformedRole = `${role.charAt(0).toUpperCase()}${role.slice(1)}`;
  const navigate = useNavigate();

  const [createUser, result] = useCreateUserMutation();
  const { isLoading } = result;

  const submitAction = async (values) => {
    const data = { ...values, role };
    await createUser({ userData: data });
    navigate("/sign-in");
  };

  return (
    <AuthContainer>
      {role !== "quizzer" && role !== "quizee" ? (
        <InvalidRole role={role} />
      ) : (
        <>
          <AuthHeader title={"Sign Up"} role={transformedRole} />
          <SignUpForm isLoading={isLoading} onSubmit={submitAction} />
        </>
      )}
    </AuthContainer>
  );
};

export default SignUp;
