import React from "react";
import scss from "../../styles/quizzesItem.module.scss";


const QuizItem = ({
  _id,
  title,
  author,
  description,
  tag,

  isAuthor = false,
  totalItems,
  actionButtons = ({ quizId, quizData }) => [],
}) => {
  const quizId = _id;
  const quizData = {
    _id,
    title,
    author,
    description,
    tag,
  };

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
        <div className={scss["btn-group"]}>
          {actionButtons({ quizId, quizData }).map(
            ({ id, Icon, label, onClick }) => (
              <button id={id ? scss[id] : ""} onClick={onClick} key={id}>
                {Icon && <Icon />}
                {!!label ? label : null}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
