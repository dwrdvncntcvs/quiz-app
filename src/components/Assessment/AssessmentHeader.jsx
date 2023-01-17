import React from "react";
import scss from "../../styles/assessmentHeader.module.scss";

const AssessmentHeader = ({ quizTitle, quizId }) => {
  return (
    <div className={scss.header}>
      <h1>{quizTitle} - Quiz</h1>
      <p>Quiz ID: {quizId}</p>
    </div>
  );
};

export default AssessmentHeader;
