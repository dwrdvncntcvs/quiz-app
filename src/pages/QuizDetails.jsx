import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../layouts/PageContainer";
import { useGetQuizByIdQuery } from "../services/quiz";

const QuizDetails = () => {
  const { quizId } = useParams();
  const { data: quizData } = useGetQuizByIdQuery({ quizId });

  return <PageContainer>QuizDetails</PageContainer>;
};

export default QuizDetails;
