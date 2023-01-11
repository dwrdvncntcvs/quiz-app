import React from "react";
import { useParams } from "react-router-dom";
import { useCreateQuestionMutation } from "../../services/question";
import scss from "../../styles/createQuestionModal.module.scss";
import QuestionForm from "./QuestionForm";

const CreateQuestionModal = ({ getQuestionData, getQuizData }) => {
  const [createQuestion] = useCreateQuestionMutation();
  const { quizId } = useParams();

  const initialData = {
    question: "",
    options: [
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
    ],
  };

  const submitQuestionAction = (values, { resetForm }) => {
    console.log("Values: ", values);
    createQuestion({ quizId, questionData: values });
    getQuestionData();
    getQuizData();
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
