import React from "react";
import { useGetQuizQuery } from "../../services/quiz";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Quizzes</h1>
      {data.map(({ title, _id }) => (
        <p key={_id}>{title}</p>
      ))}
    </div>
  );
};

export default Home;
