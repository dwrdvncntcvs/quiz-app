import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { SignUpSchema } from "../../models/AuthModel";
import scss from "../../styles/authForm.module.scss";

const initialData = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ onSubmit, isLoading }) => {
  const [showPass, setShowPass] = useState(false);

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

  const submitAction = async (values, { resetForm }) => {
    await onSubmit(values);
    resetForm();
  };

  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  return (
    <Formik
      initialValues={initialData}
      validationSchema={SignUpSchema}
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
                <button
                  type="button"
                  onClick={toggleShowPass}
                  data-testid="show-btn"
                >
                  {showPass ? <HiEyeOff /> : <HiEye />}
                </button>
              )}
            </div>
            <p className={scss.error} data-testid={`error-${name}`}>
              <ErrorMessage name={name} />
            </p>
          </Fragment>
        ))}
        <button className={scss.submit} type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
