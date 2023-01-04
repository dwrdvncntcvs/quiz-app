import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { SignInSchema } from "../../models/AuthModel";
import { useAuthorizeUserMutation } from "../../services/user";

const inputFields = [
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
];

const initialFormValue = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const [authorizeUser, result] = useAuthorizeUserMutation();
  const { data } = result;

  const submitAction = (values, { resetForm }) => {
    console.log(values);
    authorizeUser({ authData: values });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={SignInSchema}
      onSubmit={submitAction}
    >
      <Form>
        <h1>{data?.token}</h1>
        {inputFields.map(({ name, placeholder, type }) => (
          <div key={name}>
            <Field name={name} type={type} placeholder={placeholder} />
            <ErrorMessage name={name} />
          </div>
        ))}
        <button type="submit">Sign In</button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
