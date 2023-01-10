import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
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

const SignUpForm = ({
  onSubmit,
  inputFields,
  onTogglePass,
  togglePass,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={initialData}
      validationSchema={SignUpSchema}
      onSubmit={onSubmit}
    >
      <Form className={scss["auth-form"]}>
        {inputFields.map(({ name, placeholder, type }) => (
          <Fragment key={name}>
            <div className={scss["form-control"]}>
              <Field name={name} type={type} placeholder={placeholder} />
              {name === "password" && (
                <button type="button" onClick={onTogglePass}>
                  {togglePass ? <HiEyeOff /> : <HiEye />}
                </button>
              )}
            </div>
            <p className={scss.error}>
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
