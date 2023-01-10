import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { SignInSchema } from "../../models/AuthModel";
import scss from "../../styles/authForm.module.scss";
import { HiEye, HiEyeOff } from "react-icons/hi";

const initialFormValue = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit, inputFields, onTogglePass, togglePass }) => {
  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={SignInSchema}
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
        <button className={scss.submit} type="submit">
          Sign In
        </button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
