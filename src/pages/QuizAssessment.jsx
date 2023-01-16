import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageContainer from "../layouts/PageContainer";
import { calculateQuizAssessment } from "../models/QuizAssessment";
import { useGetQuestionsQuery } from "../services/question";
import scss from "../styles/quizAssessment.module.scss";

const QuizAssessment = () => {
  const { quizId } = useParams();
  const { data } = useGetQuestionsQuery({ quizId });
  const navigate = useNavigate();
  const location = useLocation();

  const correctAnswers = data?.map(({ _id, options }) => {
    return {
      questionId: _id,
      correctAnswer: options?.filter(({ isCorrect }) => isCorrect)[0]._id,
    };
  });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const correctAnsLen = correctAnswers?.length;
  const resultLen = selectedAnswers?.length;

  const isQuizCompleted = correctAnsLen === resultLen;

  const changeHandler = (questionId, optionId) => (e) => {
    const data = {
      questionId,
      selectedAnswer: optionId,
    };

    setSelectedAnswers((prevState) => {
      const foundRes = prevState.find(
        ({ questionId }) => questionId === data.questionId
      );

      if (!foundRes) return [...prevState, data];
      else {
        const newData = prevState.map((res) =>
          res.questionId === data.questionId ? data : res
        );

        return newData;
      }
    });
  };

  const submitQuizAction = (e) => {
    const { items, score, totalItems } = calculateQuizAssessment(
      correctAnswers,
      selectedAnswers
    );

    console.log("Number of correct items: ", score, "/", totalItems);
    console.log("Items: ", items);
    navigate(`${location.pathname}/result`, { replace: true });
  };

  return (
    <PageContainer className={scss["quiz-assessment"]}>
      <h1>Quiz Assessment</h1>
      <p>Quiz ID: {quizId}</p>
      <ul>
        {data?.map(({ _id: questionId, question, options }, i) => (
          <li key={questionId}>
            <p>{question}</p>
            <ul>
              {options.map(({ _id: optionId, option }) => (
                <li key={optionId}>
                  <input
                    type="radio"
                    name={`question-${i + 1}`}
                    id={optionId}
                    onChange={changeHandler(questionId, optionId)}
                  />
                  &nbsp;
                  <label htmlFor={optionId}>{option}</label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button disabled={!isQuizCompleted} onClick={submitQuizAction}>
        Submit Quiz
      </button>
    </PageContainer>
  );
};

export default QuizAssessment;
