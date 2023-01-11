import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ModalOverlay from "../components/Common/ModalOverlay";
import CreateQuestionModal from "../components/Question/CreateQuestionModal";
import QuestionCard from "../components/Question/QuestionCard";
import { modalStatus, setModal, useModal } from "../features/slice/modalSlice";
import PageContainer from "../layouts/PageContainer";
import { useGetQuestionsQuery } from "../services/question";
import { useGetQuizByIdQuery } from "../services/quiz";
import scss from "../styles/quizDetails.module.scss";

const QuizDetails = () => {
  const { status, id } = useModal();
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const { data: quizData } = useGetQuizByIdQuery({ quizId });
  const { data: questionData } = useGetQuestionsQuery({ quizId });

  const createQuestion = () => {
    dispatch(setModal({ id: "createQuestion" }));
  };

  return (
    <PageContainer className={scss.details}>
      <div className={scss.header}>
        <h1>{quizData?.title}</h1>
        <p>
          {quizData?.totalItems} Question
          {quizData?.totalItems > 1 ? "s" : ""}
        </p>
      </div>
      <div className={scss.content}>
        {questionData?.map(({ _id, question, options }, i) => (
          <QuestionCard
            id={_id}
            i={i}
            question={question}
            options={options}
            key={_id}
          />
        ))}
        <button className={scss["card-dashed"]} onClick={createQuestion}>
          Add Question
        </button>
      </div>
      {status === modalStatus.active && id === "createQuestion" && (
        <ModalOverlay>
          <CreateQuestionModal />
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default QuizDetails;
