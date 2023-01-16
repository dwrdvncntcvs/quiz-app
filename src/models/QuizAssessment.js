const calculateQuizAssessment = (correctAnswerList, selectedAnswerList) => {
  const correctItems = correctAnswerList?.filter((ca, i) => {
    return ca.correctAnswer === selectedAnswerList[i].selectedAnswer;
  });

  return {
    score: correctItems.length,
    totalItems: correctAnswerList.length,
    items: correctItems,
  };
};

export { calculateQuizAssessment };
