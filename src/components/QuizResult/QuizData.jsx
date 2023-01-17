import React from "react";
import scss from "../../styles/quizData.module.scss";

const QuizData = ({ quiz, totalItems }) => {
  return (
    <div className={scss["quiz-data"]}>
      <div className={scss.header}>
        <h1>{quiz?.title}</h1>
        <p>By {quiz?.author}</p>
      </div>
      <div className={scss.content}>
        <p>{quiz?.description}</p>
        <h2>
          {totalItems} Question{totalItems > 1 ? "s" : ""}
        </h2>
      </div>
    </div>
  );
};

export default QuizData;
