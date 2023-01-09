import React from "react";

const QuizItem = ({ title, author, description, isAuthor = false }) => {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        {!isAuthor && <p>{author}</p>}
      </div>
      <div>{description}</div>
      <div>
        {isAuthor ? (
          <>
            <button>Update</button>
            <button>Delete</button>
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
