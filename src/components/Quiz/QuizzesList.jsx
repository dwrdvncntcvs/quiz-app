import React from "react";
import QuizItem from "./QuizItem";

const QuizzesList = ({ quizzes = [] }) => {
  if (quizzes.length === 0) {
    return <p>No Quizzes Found</p>;
  }

  return (
    <ul>
      {quizzes.map((quiz) => (
        <QuizItem {...quiz} isAuthor={true} key={quiz._id} />
      ))}
    </ul>
  );
};

export default QuizzesList;
