import React from "react";
import scss from "../../styles/createQuestionModal.module.scss";
import QuestionForm from "./QuestionForm";

const CreateQuestionModal = () => {
  const initialData = {
    question: "",
    options: [
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
    ],
  };

  const submitQuestionAction = (values, { resetForm }) => {
    console.log("Values: ", values);
    resetForm();
  };

  return (
    <div className={scss["question-modal"]}>
      <h1>Create Question</h1>
      <QuestionForm initialData={initialData} onSubmit={submitQuestionAction} />
    </div>
  );
};

export default CreateQuestionModal;
