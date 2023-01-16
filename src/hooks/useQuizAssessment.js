import { useState } from "react";

const useQuizAssessment = (data = []) => {
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

  const changeHandler = (questionId, optionId)  => {
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

  return {
    isQuizCompleted,
    changeHandler,
    correctAnswers,
    selectedAnswers,
  };
};

export default useQuizAssessment;
