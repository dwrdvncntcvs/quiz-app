import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "../../services/quiz";
import scss from "../../styles/createQuiz.module.scss";
import QuizForm from "./QuizForm";

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
  };

  const updateQuizAction = (values) => {
    const quizId = state?.quizData._id;
    updateQuiz({ quizId, quizData: values });
    getUserQuizzes();
    navigate("/");
  };

  return (
    <>
      <div className={scss["backdrop"]} onClick={goBack}></div>
      <div className={scss["side-panel"]}>
        <h1>{title}</h1>
        <QuizForm
          inputFields={inputFields}
          isLoading={isLoading}
          onSubmit={state.forUpdating ? updateQuizAction : submitQuizAction}
          initialData={initialData}
        />
      </div>
    </>
  );
};

export default QuizModifier;
