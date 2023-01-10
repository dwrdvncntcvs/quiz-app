import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
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
      <p>
        <b>{i + 1}.</b> {question}
      </p>
      {options.map(({ option, isCorrect, _id }) => (
        <div key={_id}>{option}</div>
      ))}
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
