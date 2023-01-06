import React from "react";
import { useGetQuizQuery } from "../../services/quiz";
import QuizCard from "./QuizCard";
import scss from "../../styles/home.module.scss";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();

  return (
    <div className={scss.home}>
      <h1>Quizzes</h1>
      {isLoading && <p>Loading...</p>}
      {data && data.map(({ title, _id }) => <QuizCard key={_id} />)}
    </div>
  );
};

export default Home;
