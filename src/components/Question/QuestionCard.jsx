import React, { useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiX,
} from "react-icons/hi";
import scss from "../../styles/questionCard.module.scss";

const QuestionCard = ({ id, i, question, options }) => {
  const [show, setShow] = useState(false);

  const showButtons = () => {
    setShow(true);
  };

  const hideButtons = () => {
    setShow(false);
  };

  return (
    <div
      key={id}
      className={scss["card"]}
      onMouseEnter={showButtons}
      onMouseLeave={hideButtons}
    >
      <p id={scss.question}>
        {i + 1}. {question}{" "}
      </p>

      <div>
        {options.map(({ option, isCorrect, _id }) => (
          <div
            key={_id}
            className={`${scss.option} ${
              isCorrect ? scss.correct : scss.wrong
            }`}
          >
            {isCorrect ? <HiOutlineCheckCircle /> : <HiX />}
            {option}
          </div>
        ))}
      </div>

      {show && (
        <div className={scss["btn-group"]}>
          <button id={scss.edit}>
            <HiOutlinePencil />
          </button>
          <button id={scss.delete}>
            <HiOutlineTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
