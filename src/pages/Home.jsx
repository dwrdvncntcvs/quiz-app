import React from "react";
import { useGetQuizQuery } from "../services/quiz";
import QuizzesList from "../components/Quiz/QuizzesList";
import PageContainer from "../layouts/PageContainer";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();

  return (
    <PageContainer>
      <h1>Quizzes</h1>
      {isLoading ? <p>Loading...</p> : <QuizzesList quizzes={data} />}
    </PageContainer>
  );
};

export default Home;
