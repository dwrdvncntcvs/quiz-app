import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { SignInSchema } from "../../models/AuthModel";

const inputFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  {
    name: "password",
    type: "text",
    placeholder: "Password",
  },
];

const initialFormValue = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const submitAction = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={SignInSchema}
      onSubmit={submitAction}
    >
      <Form>
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
