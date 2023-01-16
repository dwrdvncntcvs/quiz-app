const calculateQuizAssessment = (correctAnswerList, selectedAnswerList) => {
  const correctItems = correctAnswerList?.filter((ca, i) => {
    console.log("Correct Answer = ", ca.correctAnswer);
    console.log("My Answer = ", selectedAnswerList[i].selectedAnswer);
    console.log(ca.correctAnswer === selectedAnswerList[i].selectedAnswer);
    return ca.correctAnswer === selectedAnswerList[i].selectedAnswer;
  });

  return {
    score: correctItems.length,
    totalItems: correctAnswerList.length,
    items: correctItems,
  };
};

export { calculateQuizAssessment };
