import React from "react";
import { HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ModalOverlay from "../components/Common/ModalOverlay";
import QuestionModifierModal from "../components/Question/QuestionModifierModal";
import QuestionCard from "../components/Question/QuestionCard";
import { modalStatus, setModal, useModal } from "../features/slice/modalSlice";
import PageContainer from "../layouts/PageContainer";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../services/question";
import { useGetQuizByIdQuery } from "../services/quiz";
import scss from "../styles/quizDetails.module.scss";

const QuizDetails = () => {
  const { status, id } = useModal();
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const { data: quizData, refetch: refetchQuiz } = useGetQuizByIdQuery({
    quizId,
  });
  const { data: questionData, refetch: refetchQuestion } = useGetQuestionsQuery(
    { quizId }
  );
  const [deleteQuestion] = useDeleteQuestionMutation();

  const createQuestion = () => {
    dispatch(setModal({ id: "createQuestion" }));
  };

  const deleteQuestionAction = async (id) => {
    console.log("Deleting Question ID: ", id);
    await deleteQuestion({ questionId: id });
    await refetchQuiz();
    await refetchQuestion();
  };

  const editQuestionAction = (questionData) => {
    console.log("Edit Question Modal: ", questionData);
    dispatch(
      setModal({
        id: "editQuestion",
        props: {
          ...questionData,
        },
      })
    );
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
        <button className={scss["card-dashed"]} onClick={createQuestion}>
          <HiPlus /> Question
        </button>
        {questionData?.map(({ _id, question, options }, i) => (
          <QuestionCard
            id={_id}
            i={i}
            question={question}
            options={options}
            key={_id}
            onDelete={deleteQuestionAction}
            onEdit={editQuestionAction}
          />
        ))}
      </div>
      {status === modalStatus.active && id === "createQuestion" && (
        <ModalOverlay>
          <QuestionModifierModal
            title="Create Question"
            getQuestionData={refetchQuestion}
            getQuizData={refetchQuiz}
          />
        </ModalOverlay>
      )}
      {status === modalStatus.active && id === "editQuestion" && (
        <ModalOverlay>
          <QuestionModifierModal
            title="Edit Question"
            getQuestionData={refetchQuestion}
            getQuizData={refetchQuiz}
          />
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default QuizDetails;
