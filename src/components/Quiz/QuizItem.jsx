import React from "react";
import scss from "../../styles/quizzesItem.module.scss";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";

const QuizItem = ({ title, author, description, isAuthor = false, tag }) => {
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
        {isAuthor ? (
          <>
            <button id={scss.view}>
              <HiOutlineEye />
            </button>
            <button id={scss.edit}>
              <HiOutlinePencil />
            </button>
            <button id={scss.delete}>
              <HiOutlineTrash />
            </button>
          </>
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
