import React from "react";
import { HiPlus } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/slice/authSlice";
import { useGetUserQuizzesQuery } from "../../services/quiz";
import scss from "../../styles/quizzerHome.module.scss";
import QuizzesList from "./QuizzesList";

const QuizzerHome = () => {
  const { user } = useAuth();

  console.log(user)

  const { data } = useGetUserQuizzesQuery(user._id);

  return (
    <div className={scss["quizzer-home"]}>
      <h1>My Quizzes</h1>
      <QuizzesList quizzes={data} />
      <button id={scss["add-quiz-btn"]}>
        <HiPlus />
      </button>
      <Outlet />
    </div>
  );
};

export default QuizzerHome;
