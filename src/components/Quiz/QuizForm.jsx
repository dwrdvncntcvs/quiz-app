import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import { quizSchema } from "../../models/QuizModel";
import scss from "../../styles/quizForm.module.scss";

const QuizForm = ({ onSubmit, inputFields, isLoading, initialData }) => {
  const { state } = useLocation();
  const { forUpdating } = state;

  return (
    <Formik
      initialValues={initialData}
      validationSchema={quizSchema}
      onSubmit={onSubmit}
    >
      {({ errors }) => {
        return (
          <Form className={scss.form}>
            {inputFields.map(({ as, label, name }) => (
              <div className={scss["form-control"]} key={name}>
                <label htmlFor={name}>
                  {forUpdating ? "Modify" : "Add"} {label}
                </label>
                <Field type="text" name={name} as={as}></Field>
                <p className={scss.error}>
                  <ErrorMessage name={name} />
                </p>
              </div>
            ))}
            <button type="submit" disabled={isLoading}>
              {forUpdating ? "Update" : "Create"} Quiz
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default QuizForm;
