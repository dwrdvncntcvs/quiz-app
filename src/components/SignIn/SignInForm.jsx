import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, useAuth } from "../../features/slice/authSlice";
import { destroyModal } from "../../features/slice/modalSlice";
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
  const dispatch = useDispatch();
  const [authorizeUser, result] = useAuthorizeUserMutation();
  const { data, isSuccess } = result;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data));
      dispatch(destroyModal());
    }
  }, [isSuccess, data, dispatch]);

  const submitAction = (values, { resetForm }) => {
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
