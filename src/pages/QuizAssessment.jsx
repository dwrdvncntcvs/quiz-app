import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../layouts/PageContainer";
import scss from "../styles/quizAssessment.module.scss";

const QuizAssessment = () => {
  const { quizId } = useParams();

  return (
    <PageContainer className={scss["quiz-assessment"]}>
      <h1>Quiz Assessment</h1>
      <p>Quiz ID: {quizId}</p>
    </PageContainer>
  );
};

export default QuizAssessment;
