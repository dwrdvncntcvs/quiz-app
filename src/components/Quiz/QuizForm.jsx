import { Formik, Form, Field } from "formik";
import React from "react";
import { useCreateQuizMutation } from "../../services/quiz";
import scss from "../../styles/quizForm.module.scss";

const initialData = {
  title: "",
  description: "",
  tag: "",
};

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

const QuizForm = () => {
  const [createQuiz, result] = useCreateQuizMutation();
  const { isLoading } = result;

  const submitQuizAction = (values) => {
    console.log("Values: ", values);
    createQuiz({ quizData: values });
  };
  return (
    <Formik initialValues={initialData} onSubmit={submitQuizAction}>
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
