import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuizData from "../components/QuizResult/QuizData";
import ResultDetails from "../components/QuizResult/ResultDetails";
import PageContainer from "../layouts/PageContainer";
import { useGetQuizResultQuery } from "../services/quizResult";
import scss from "../styles/quizResult.module.scss";

const QuizResult = () => {
  const { quizResultId, quizId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useGetQuizResultQuery({ quizResultId });

  const retakeQuizAction = () => {
    navigate(`/quizee/assessment/${quizId}?title=${state.title}`, {
      replace: true,
    });
  };

  const takeMoreQuizzesAction = () => {
    navigate("/");
  };

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
          <button onClick={retakeQuizAction}>Retake Quiz</button>
          <button onClick={takeMoreQuizzesAction}>Take More Quizzes</button>
        </div>
      </div>
    </PageContainer>
  );
};

export default QuizResult;
