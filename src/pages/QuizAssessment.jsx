import React from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AssessmentHeader from "../components/Assessment/AssessmentHeader";
import Question from "../components/Assessment/Question";
import useQuizAssessment from "../hooks/useQuizAssessment";
import PageContainer from "../layouts/PageContainer";
import { calculateQuizAssessment } from "../models/QuizAssessment";
import { useGetQuestionsQuery } from "../services/question";
import { useSaveScoreMutation } from "../services/quizResult";
import scss from "../styles/quizAssessment.module.scss";
import { revertURLQueryToPlainText } from "../utils/helpers";

const QuizAssessment = () => {
  const { quizId } = useParams();
  const { data } = useGetQuestionsQuery({ quizId });
  const [saveScore] = useSaveScoreMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const quizTitle = revertURLQueryToPlainText(searchParams.get("title"));

  const { changeHandler, correctAnswers, isQuizCompleted, selectedAnswers } =
    useQuizAssessment(data);

  const submitQuizAction = async (e) => {
    const { score } = calculateQuizAssessment(correctAnswers, selectedAnswers);

    const assessmentData = {
      score,
    };

    const {
      data: { _id: quizResultId },
    } = await saveScore({ quizId, assessmentData });
    navigate(`${location.pathname}/result/${quizResultId}`, { replace: true });
  };

  return (
    <PageContainer className={scss["quiz-assessment"]}>
      <AssessmentHeader quizId={quizId} quizTitle={quizTitle} />
      <ul className={scss.questions}>
        {data?.map(({ _id: questionId, question, options }, i) => (
          <Question
            key={questionId}
            onChange={changeHandler}
            options={options}
            question={question}
            questionId={questionId}
            questionIndex={i + 1}
          />
        ))}
      </ul>
      <button
        className={scss.submit}
        disabled={!isQuizCompleted}
        onClick={submitQuizAction}
      >
        <HiOutlinePaperAirplane />
      </button>
    </PageContainer>
  );
};

export default QuizAssessment;
