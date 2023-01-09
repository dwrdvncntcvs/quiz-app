import React from "react";
import { useAuth } from "../../features/slice/authSlice";
import { useGetUserQuizzesQuery } from "../../services/quiz";
import scss from "../../styles/quizzerHome.module.scss";
import QuizzesList from "./QuizzesList";

const QuizzerHome = () => {
  const { user } = useAuth();
  const { _id } = user;

  const { data } = useGetUserQuizzesQuery(_id);

  return (
    <div className={scss["quizzer-home"]}>
      <h1>My Quizzes</h1>
      <QuizzesList quizzes={data} />
    </div>
  );
};

export default QuizzerHome;
