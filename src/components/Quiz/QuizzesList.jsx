import React from "react";
import QuizItem from "./QuizItem";
import scss from "../../styles/quizzesList.module.scss";
import { useAuth } from "../../features/slice/authSlice";
import { mergeName } from "../../utils/helpers";

const QuizzesList = ({
  quizzes = [],
  onDeleteQuiz,
  onUpdateQuiz,
  onViewQuiz,
}) => {
  const { user } = useAuth();

  if (quizzes.length === 0) {
    return <p>No Quizzes Found</p>;
  }

  return (
    <ul className={scss["quizzes-list"]}>
      {quizzes.map((quiz) => (
        <QuizItem
          {...quiz}
          isAuthor={
            user.role === "quizzer" &&
            mergeName(user.first_name, user.last_name) === quiz.author
          }
          key={quiz._id}
          onDeleteQuiz={() => onDeleteQuiz(quiz._id)}
          onUpdateQuiz={() => onUpdateQuiz(quiz)}
          onViewQuiz={() => onViewQuiz(quiz._id)}
        />
      ))}
    </ul>
  );
};

export default QuizzesList;
