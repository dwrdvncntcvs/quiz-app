import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { SignInSchema } from "../../models/AuthModel";
import scss from "../../styles/authForm.module.scss";
import { HiEye, HiEyeOff } from "react-icons/hi";

const initialFormValue = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const [showPass, setShowPass] = useState(false);

  const submitAction = async (values, { resetForm }) => {
    await onSubmit(values);
    resetForm();
  };

  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };

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

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={SignInSchema}
      onSubmit={submitAction}
    >
      <Form className={scss["auth-form"]} data-testid="form-id">
        {inputFields.map(({ name, placeholder, type }) => (
          <Fragment key={name}>
            <div className={scss["form-control"]}>
              <Field
                name={name}
                type={type}
                placeholder={placeholder}
                data-testid={name}
              />
              {name === "password" && (
                <button type="button" onClick={toggleShowPass} title="show-btn">
                  {showPass ? (
                    <HiEyeOff title="eye-off" />
                  ) : (
                    <HiEye title="eye" />
                  )}
                </button>
              )}
            </div>
            <p className={scss.error} data-testid={`error-${name}`}>
              <ErrorMessage name={name} />
            </p>
          </Fragment>
        ))}
        <button className={scss.submit} type="submit" title="submit-form">
          Sign In
        </button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
