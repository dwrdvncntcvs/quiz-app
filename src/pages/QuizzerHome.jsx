import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/slice/authSlice";
import {
  useDeleteQuizMutation,
  useGetUserQuizzesQuery,
} from "../services/quiz";
import QuizzesList from "../components/Quiz/QuizzesList";
import PageContainer from "../layouts/PageContainer";
import FloatingButton from "../components/Common/FloatingButton";
import { toast } from "react-toastify";
import {
  HiDotsHorizontal,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

const QuizzerHome = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useGetUserQuizzesQuery({
    userId: user._id,
  });

  const [deleteQuiz] = useDeleteQuizMutation();

  const navigate = useNavigate();

  const createQuizTrigger = () => {
    navigate("/quizzer/create-quiz", { state: { from: "/" } });
  };

  const deleteQuizAction = async (id) => {
    deleteQuiz(id);
    await refetch();
    toast.success("Quiz deleted successfully");
  };

  const updateQuizAction = (quiz) => {
    navigate(`/quizzer/update-quiz/${quiz._id}`, {
      state: { from: "/", forUpdating: true, quizData: quiz },
    });
  };

  const viewQuizDetailsAction = (quizId) => {
    navigate(`/quizzer/quiz/${quizId}`);
  };

  const actionButtons = ({ quizId, quizData }) => [
    {
      id: "view",
      Icon: HiDotsHorizontal,
      onClick: () => viewQuizDetailsAction(quizId),
    },
    {
      id: "edit",
      Icon: HiOutlinePencil,
      onClick: () => updateQuizAction(quizData),
    },
    {
      id: "delete",
      Icon: HiOutlineTrash,
      onClick: () => deleteQuizAction(quizId),
    },
  ];

  return (
    <PageContainer>
      <h1>My Quizzes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <QuizzesList quizzes={data} actionButtons={actionButtons} />
      )}
      <FloatingButton onClick={createQuizTrigger} />
      <Outlet context={{ getUserQuizzes: refetch }} />
    </PageContainer>
  );
};

export default QuizzerHome;
