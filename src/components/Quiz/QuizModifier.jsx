import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "../../services/quiz";
import scss from "../../styles/createQuiz.module.scss";
import QuizForm from "./QuizForm";

const QuizModifier = ({ title }) => {
  const [createQuiz, createResult] = useCreateQuizMutation();
  const [updateQuiz, updateResult] = useUpdateQuizMutation();
  const { getUserQuizzes } = useOutletContext();
  const { isLoading: isCreateLoading } = createResult;
  const { isLoading: isUpdateLoading } = updateResult;

  const isLoading = isCreateLoading || isUpdateLoading;

  const navigate = useNavigate();
  const { state } = useLocation();

  const goBack = () => {
    navigate(state.from);
  };

  let initialData = {
    title: "",
    description: "",
    tag: "",
  };

  if (state?.quizData) {
    initialData = {
      title: state.quizData.title,
      description: state.quizData.description,
      tag: state.quizData.tag,
    };
  }

  const submitQuizAction = (values) => {
    createQuiz({ quizData: values });
    getUserQuizzes();
    navigate("/");
    toast.success("Quiz created successfully");
  };

  const updateQuizAction = (values) => {
    const quizId = state?.quizData._id;
    updateQuiz({ quizId, quizData: values });
    getUserQuizzes();
    navigate("/");
    toast.success("Quiz updated successfully");
  };

  return (
    <>
      <div className={scss["backdrop"]} onClick={goBack}></div>
      <div className={scss["side-panel"]}>
        <h1>{title}</h1>
        <QuizForm
          isLoading={isLoading}
          onSubmit={state.forUpdating ? updateQuizAction : submitQuizAction}
          initialData={initialData}
          forUpdating={state.forUpdating}
        />
      </div>
    </>
  );
};

export default QuizModifier;
