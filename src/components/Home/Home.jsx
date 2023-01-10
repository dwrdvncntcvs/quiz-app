import React from "react";
import { useGetQuizQuery } from "../../services/quiz";
import scss from "../../styles/home.module.scss";
import QuizzesList from "../Quiz/QuizzesList";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();

  return (
    <div className={scss.home}>
      <h1>Quizzes</h1>
      {isLoading ? <p>Loading...</p> : <QuizzesList quizzes={data} />}
    </div>
  );
};

export default Home;
