import React from "react";
import { useGetQuizQuery } from "../../services/quiz";
import scss from "../../styles/home.module.scss";
import QuizItem from "../Quiz/QuizItem";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();

  return (
    <div className={scss.home}>
      <h1>Quizzes</h1>
      {isLoading && <p>Loading...</p>}
      {data && data.map((quiz) => <QuizItem key={quiz._id} {...quiz} />)}
    </div>
  );
};

export default Home;
