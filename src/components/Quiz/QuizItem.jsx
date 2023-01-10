import React from "react";
import scss from "../../styles/quizzesItem.module.scss";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";

const QuizItem = ({
  title,
  author,
  description,
  isAuthor = false,
  tag,
  totalItems,
  onDeleteQuiz,
  onUpdateQuiz,
}) => {
  return (
    <div className={scss.quiz}>
      <div className={scss.header}>
        <h1>{title}</h1>
        {!isAuthor && (
          <p>
            <i>{author}</i>
          </p>
        )}
      </div>
      <div className={scss.content}>
        <p>{description}</p>
        <br />
        <span>#{tag.toLowerCase()}</span>
      </div>
      <div className={scss[`footer${isAuthor ? "-author" : ""}`]}>
        <p className={scss["total-items"]}>
          {totalItems} Question{totalItems > 1 ? "s" : ""}
        </p>
        {isAuthor ? (
          <div className={scss["btn-group"]}>
            <button id={scss.view}>
              <HiPlus />
            </button>
            <button id={scss.edit} onClick={onUpdateQuiz}>
              <HiOutlinePencil />
            </button>
            <button id={scss.delete} onClick={onDeleteQuiz}>
              <HiOutlineTrash />
            </button>
          </div>
        ) : (
          <>
            <button>Take Quiz</button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizItem;
