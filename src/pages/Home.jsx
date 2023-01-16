import React from "react";
import { useGetQuizQuery } from "../services/quiz";
import QuizzesList from "../components/Quiz/QuizzesList";
import PageContainer from "../layouts/PageContainer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();
  const navigate = useNavigate();

  const actionButtons = ({ quizId }) => [
    {
      id: "take-quiz",
      label: "Take Quiz",
      onClick: () => {
        console.log("Take Quiz ID: ", quizId);
        navigate(`/quizee/assessment/${quizId}`);
      },
    },
  ];

  return (
    <PageContainer>
      <h1>Quizzes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <QuizzesList quizzes={data} actionButtons={actionButtons} />
      )}
    </PageContainer>
  );
};

export default Home;
