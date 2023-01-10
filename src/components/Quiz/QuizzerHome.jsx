import React from "react";
import { HiPlus } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/slice/authSlice";
import { useGetUserQuizzesQuery } from "../../services/quiz";
import scss from "../../styles/quizzerHome.module.scss";
import QuizzesList from "./QuizzesList";

const QuizzerHome = () => {
  const { user } = useAuth();
  const { data, refetch } = useGetUserQuizzesQuery(user._id);
  const navigate = useNavigate();

  const createQuizTrigger = () => {
    navigate("/create-quiz", { state: { from: "/" } });
  };

  return (
    <div className={scss["quizzer-home"]}>
      <h1>My Quizzes</h1>
      <QuizzesList quizzes={data} />
      <button onClick={createQuizTrigger} id={scss["add-quiz-btn"]}>
        <HiPlus />
      </button>
      <Outlet context={{ getUserQuizzes: refetch }} />
    </div>
  );
};

export default QuizzerHome;
