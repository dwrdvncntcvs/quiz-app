import React from "react";
import { useGetQuizQuery } from "../../services/quiz";

const Home = () => {
  const { data, isLoading } = useGetQuizQuery();

  return (
    <div>
      <h1>Quizzes</h1>
      {isLoading && <p>Loading...</p>}
      {data && data.map(({ title, _id }) => <p key={_id}>{title}</p>)}
    </div>
  );
};

export default Home;
