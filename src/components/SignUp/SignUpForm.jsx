import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { destroyModal } from "../../features/slice/modalSlice";
import { SignUpSchema } from "../../models/AuthModel";
import { useCreateUserMutation } from "../../services/user";

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
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

const initialData = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [createUser, result] = useCreateUserMutation();
  const { isLoading } = result;

  const submitAction = (values, { resetForm }) => {
    createUser({ userData: values });
    resetForm();
    dispatch(destroyModal());
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={SignUpSchema}
      onSubmit={submitAction}
    >
      <Form>
        {inputFields.map(({ name, placeholder, type }) => (
          <div key={name}>
            <Field name={name} type={type} placeholder={placeholder} />
            <ErrorMessage name={name} />
          </div>
        ))}
        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
