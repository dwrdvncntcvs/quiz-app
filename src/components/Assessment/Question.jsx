import React, { useState } from "react";
import scss from "../../styles/question.module.scss";

const Question = ({
  questionId,
  question,
  options,
  onChange,
  questionIndex,
}) => {
  const [option, setOption] = useState({ optionId: "", questionId: "" });

  const selectOption = (optionId, questionId) => {
    const data = { optionId, questionId };
    setOption((prev) => ({ ...prev, ...data }));
    onChange(questionId, optionId);
  };

  return (
    <li className={scss.question}>
      <div className={scss.header}>
        <p>
          {questionIndex}. {question}
        </p>
      </div>
      <ul className={scss.choices}>
        {options.map(({ _id: optionId, option: optionLabel }) => {
          return (
            <li key={optionId} className={scss.option}>
              <button
                className={option.optionId === optionId ? scss.selected : ""}
                onClick={() => selectOption(optionId, questionId)}
              >
                {optionLabel}
              </button>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Question;
