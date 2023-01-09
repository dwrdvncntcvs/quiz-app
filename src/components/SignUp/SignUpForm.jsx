import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { destroyModal, useModal } from "../../features/slice/modalSlice";
import { SignUpSchema } from "../../models/AuthModel";
import { useCreateUserMutation } from "../../services/user";
import scss from "../../styles/authForm.module.scss";

const initialData = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    props: { role },
  } = useModal();

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

  const dispatch = useDispatch();
  const [createUser, result] = useCreateUserMutation();
  const { isLoading } = result;

  const submitAction = (values, { resetForm }) => {
    const data = { ...values, role };

    createUser({ userData: data });
    resetForm();
    dispatch(destroyModal());
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
      <Form className={scss["auth-form"]}>
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
        <button className={scss.submit} type="submit" disabled={isLoading}>
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
