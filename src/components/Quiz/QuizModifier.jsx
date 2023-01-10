import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import scss from "../../styles/createQuiz.module.scss";
import QuizForm from "./QuizForm";

const QuizModifier = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(location.state.from);
  };

  return (
    <>
      <div className={scss["backdrop"]} onClick={goBack}></div>
      <div className={scss["side-panel"]}>
        <h1>{title}</h1>
        <QuizForm />
      </div>
    </>
  );
};

export default QuizModifier;
