import React from "react";
import { HiPlus } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";
import {
  useDeleteQuizMutation,
  useGetUserQuizzesQuery,
} from "../services/quiz";
import scss from "../styles/quizzerHome.module.scss";
import QuizzesList from "../components/Quiz/QuizzesList";
import PageContainer from "../layouts/PageContainer";

const QuizzerHome = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useGetUserQuizzesQuery(user._id);
  const [deleteQuiz] = useDeleteQuizMutation();

  const navigate = useNavigate();

  const createQuizTrigger = () => {
    navigate("/create-quiz", { state: { from: "/" } });
  };

  const deleteQuizAction = (id) => {
    deleteQuiz(id);
    refetch();
  };

  const updateQuizAction = (quiz) => {
    navigate(`/update-quiz/${quiz._id}`, {
      state: { from: "/", forUpdating: true, quizData: quiz },
    });
  };

  const viewQuizDetailsAction = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <PageContainer>
      <h1>My Quizzes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <QuizzesList
          quizzes={data}
          onDeleteQuiz={deleteQuizAction}
          onUpdateQuiz={updateQuizAction}
          onViewQuiz={viewQuizDetailsAction}
        />
      )}
      <button onClick={createQuizTrigger} id={scss["add-quiz-btn"]}>
        <HiPlus />
      </button>
      <Outlet context={{ getUserQuizzes: refetch }} />
    </PageContainer>
  );
};

export default QuizzerHome;
