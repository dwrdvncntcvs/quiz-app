import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/slice/authSlice";
import { destroyModal } from "../../features/slice/modalSlice";
import { SignInSchema } from "../../models/AuthModel";
import { useAuthorizeUserMutation } from "../../services/user";
import scss from "../../styles/authForm.module.scss";
import { HiEye, HiEyeOff } from "react-icons/hi";

const initialFormValue = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [authorizeUser, result] = useAuthorizeUserMutation();
  const { data, isSuccess } = result;
  const [showPass, setShowPass] = useState(false);

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
      dispatch(destroyModal());
    }
  }, [isSuccess, data, dispatch]);

  const submitAction = (values, { resetForm }) => {
    authorizeUser({ authData: values });
    resetForm();
  };

  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={SignInSchema}
      onSubmit={submitAction}
    >
      <Form className={scss["auth-form"]}>
        <h1>{data?.token}</h1>
        {inputFields.map(({ name, placeholder, type }) => (
          <Fragment key={name}>
            <div className={scss["form-control"]}>
              <Field name={name} type={type} placeholder={placeholder} />
              {name === "password" && (
                <button type="button" onClick={toggleShowPass}>
                  {showPass ? <HiEyeOff /> : <HiEye />}
                </button>
              )}
            </div>
            <p className={scss.error}>
              <ErrorMessage name={name} />
            </p>
          </Fragment>
        ))}
        <button className={scss.submit} type="submit">Sign In</button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
