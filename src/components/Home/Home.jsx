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
      {data &&
        data.map(({ title, author, description, _id }) => (
          <QuizItem
            key={_id}
            author={author}
            title={title}
            description={description}
          />
        ))}
    </div>
  );
};

export default Home;
