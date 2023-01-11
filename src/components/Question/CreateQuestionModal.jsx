import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { destroyModal } from "../../features/slice/modalSlice";
import { useCreateQuestionMutation } from "../../services/question";
import scss from "../../styles/createQuestionModal.module.scss";
import QuestionForm from "./QuestionForm";

const CreateQuestionModal = ({ getQuestionData, getQuizData }) => {
  const [createQuestion] = useCreateQuestionMutation();
  const { quizId } = useParams();
  const dispatch = useDispatch();

  const initialData = {
    question: "",
    options: [
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
    ],
  };

  const closeModal = () => {
    dispatch(destroyModal());
  };

  const submitQuestionAction = async (values, { resetForm }) => {
    console.log("Values: ", values);
    await createQuestion({ quizId, questionData: values });
    await getQuestionData();
    await getQuizData();
    resetForm();
    closeModal();
  };

  return (
    <div className={scss["question-modal"]}>
      <h1>Create Question</h1>
      <QuestionForm initialData={initialData} onSubmit={submitQuestionAction} />
    </div>
  );
};

export default CreateQuestionModal;
