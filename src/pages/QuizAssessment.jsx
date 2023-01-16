import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuizAssessment from "../hooks/useQuizAssessment";
import PageContainer from "../layouts/PageContainer";
import { calculateQuizAssessment } from "../models/QuizAssessment";
import { useGetQuestionsQuery } from "../services/question";
import { useSaveScoreMutation } from "../services/quizResult";
import scss from "../styles/quizAssessment.module.scss";

const QuizAssessment = () => {
  const { quizId } = useParams();
  const { data } = useGetQuestionsQuery({ quizId });
  const [saveScore] = useSaveScoreMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const { changeHandler, correctAnswers, isQuizCompleted, selectedAnswers } =
    useQuizAssessment(data);

  const submitQuizAction = async (e) => {
    const { items, score, totalItems } = calculateQuizAssessment(
      correctAnswers,
      selectedAnswers
    );

    const assessmentData = {
      score,
    };

    const {
      data: { _id: quizResultId },
    } = await saveScore({ quizId, assessmentData });

    console.log("Quiz Result Id: ", quizResultId);

    console.log("Number of correct items: ", score, "/", totalItems);
    console.log("Items: ", items);
    navigate(`${location.pathname}/result/${quizResultId}`, { replace: true });
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
