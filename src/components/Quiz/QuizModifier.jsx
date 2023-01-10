import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useCreateQuizMutation } from "../../services/quiz";
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
  const [createQuiz, result] = useCreateQuizMutation();
  const { getUserQuizzes } = useOutletContext();
  const { isLoading } = result;

  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(location.state.from);
  };

  const submitQuizAction = (values) => {
    console.log("Values: ", values);
    createQuiz({ quizData: values });
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
          onSubmit={submitQuizAction}
        />
      </div>
    </>
  );
};

export default QuizModifier;
