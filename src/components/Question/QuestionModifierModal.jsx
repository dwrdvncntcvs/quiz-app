import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { destroyModal, useModal } from "../../features/slice/modalSlice";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from "../../services/question";
import scss from "../../styles/createQuestionModal.module.scss";
import QuestionForm from "./QuestionForm";

const QuestionModifierModal = ({ title, getQuestionData, getQuizData }) => {
  const { props } = useModal();
  const [createQuestion] = useCreateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const { quizId } = useParams();
  const dispatch = useDispatch();

  let initialData = {
    question: "",
    options: [
      { isCorrect: false, option: "" },
      { isCorrect: false, option: "" },
    ],
  };

  if (props?.questionData) {
    initialData = props?.questionData;
  }

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
    toast.success("Question created successfully");
  };

  const updateQuestionAction = async (values) => {
    console.log("Values: ", values);
    await updateQuestion({
      questionId: props.questionId,
      questionData: values,
    });
    await getQuestionData();
    closeModal();
    toast.success("Question updated successfully");
  };

  return (
    <div className={scss["question-modal"]}>
      <h1>{title}</h1>
      <QuestionForm
        initialData={initialData}
        onSubmit={
          props?.isUpdating ? updateQuestionAction : submitQuestionAction
        }
        isUpdating={props?.isUpdating}
      />
    </div>
  );
};

export default QuestionModifierModal;
