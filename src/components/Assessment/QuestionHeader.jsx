import React from "react";
import scss from "../../styles/questionHeader.module.scss";

const QuestionHeader = ({ questionIndex, question }) => {
  return (
    <div className={scss.header}>
      <p>
        {questionIndex}. {question}
      </p>
    </div>
  );
};

export default QuestionHeader;
