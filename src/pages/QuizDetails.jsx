import React from "react";
import { useParams } from "react-router-dom";

const QuizDetails = () => {
  const params = useParams();
  console.log("Quiz Details Page Params: ", params);

  return <div>QuizDetails</div>;
};

export default QuizDetails;
