import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { quizSchema } from "../../models/QuizModel";
import scss from "../../styles/quizForm.module.scss";

const QuizForm = ({ onSubmit, isLoading, initialData, forUpdating }) => {
  const inputFields = [
    {
      name: "title",
      label: "Title",
      as: "input",
    },
    {
      name: "description",
      label: "Description",
      as: "textarea",
    },
    {
      name: "tag",
      label: "Tag",
      as: "input",
    },
  ];

  return (
    <Formik
      initialValues={initialData}
      validationSchema={quizSchema}
      onSubmit={onSubmit}
    >
      <Form className={scss.form}>
        {inputFields.map(({ as, label, name }) => (
          <div className={scss["form-control"]} key={name}>
            <label htmlFor={name}>
              {forUpdating ? "Modify" : "Add"} {label}
            </label>
            <Field
              type="text"
              id={name}
              name={name}
              as={as}
              data-testid={name}
            ></Field>
            <p className={scss.error}>
              <ErrorMessage name={name} />
            </p>
          </div>
        ))}
        <button type="submit" disabled={isLoading}>
          {forUpdating ? "Update" : "Create"} Quiz
        </button>
      </Form>
    </Formik>
  );
};

export default QuizForm;
