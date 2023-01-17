import React from "react";
import { useParams } from "react-router-dom";
import QuizData from "../components/QuizResult/QuizData";
import ResultDetails from "../components/QuizResult/ResultDetails";
import PageContainer from "../layouts/PageContainer";
import { useGetQuizResultQuery } from "../services/quizResult";
import scss from "../styles/quizResult.module.scss";

const QuizResult = () => {
  const { quizResultId } = useParams();
  const { data } = useGetQuizResultQuery({ quizResultId });
  console.log("Data: ", data);

  return (
    <PageContainer>
      <QuizData quiz={data?.quiz} totalItems={data?.totalItems} />
      <div className={scss.content}>
        <ResultDetails
          date={data?.date}
          percentage={data?.percentage}
          score={data?.score}
          totalItems={data?.totalItems}
          user={data?.user}
        />
        <div className={scss["btn-group"]}>
          <button>Retake Quiz</button>
          <button>Take More Quizzes</button>
        </div>
      </div>
    </PageContainer>
  );
};

export default QuizResult;
