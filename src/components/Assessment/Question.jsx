import React, { useState } from "react";
import scss from "../../styles/question.module.scss";
import OptionsList from "./OptionsList";
import QuestionHeader from "./QuestionHeader";

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
      <QuestionHeader question={question} questionIndex={questionIndex} />
      <OptionsList
        onSelectOption={selectOption}
        options={options}
        questionId={questionId}
        selectedOption={option}
      />
    </li>
  );
};

export default Question;
