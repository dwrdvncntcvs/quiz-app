import { Formik, Form, Field } from "formik";
import React from "react";
import scss from "../../styles/quizForm.module.scss";

const initialData = {
  title: "",
  description: "",
  tag: "",
};

const QuizForm = ({ onSubmit, inputFields, isLoading }) => {
  return (
    <Formik initialValues={initialData} onSubmit={onSubmit}>
      <Form className={scss.form}>
        {inputFields.map(({ as, label, name }) => (
          <div className={scss["form-control"]} key={name}>
            <label htmlFor={name}>Add {label}</label>
            <Field type="text" name={name} as={as}></Field>
          </div>
        ))}
        <button type="submit" disabled={isLoading}>
          Create Quiz
        </button>
      </Form>
    </Formik>
  );
};

export default QuizForm;
