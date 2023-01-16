import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../layouts/PageContainer";
import { useGetQuizResultQuery } from "../services/quizResult";
import { fromNow, transformDate } from "../utils/helpers";

const QuizResult = () => {
  const { quizResultId } = useParams();
  const { data } = useGetQuizResultQuery({ quizResultId });
  console.log("Data: ", data);

  return (
    <PageContainer>
      <div>
        <h1>{data?.quiz.title}</h1>
        <p>By {data?.quiz.author}</p>
        <p>{data?.quiz.description}</p>

        <h2>
          {data?.totalItems} Question{data?.totalItems > 1 ? "s" : ""}
        </h2>
      </div>
      <div>
        <h1>Result</h1>
        <p>
          Date: {transformDate(data?.date)} | {fromNow(data?.date)}
        </p>
        <p>Quizee: {data?.user.name}</p>
        <p>
          Score: {data?.score} / {data?.totalItems}
        </p>
        <p>Percentage: {data?.percentage}%</p>
      </div>
      <button>Take More Quizzes</button>
    </PageContainer>
  );
};

export default QuizResult;
