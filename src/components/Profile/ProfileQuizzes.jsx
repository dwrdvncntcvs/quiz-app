import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import scss from "../../styles/profileQuiz.module.scss";

const ProfileQuizzes = ({ isLoading, data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const viewRecordAction = (quizId) => (e) => {
    console.log("Quiz ID: ", quizId);
    navigate(`quiz-record/${quizId}`, {
      state: { from: location.pathname, quizId },
    });
  };

  return (
    <div className={scss.quizzes}>
      <h1>Quizzes Taken</h1>
      <div className={scss.content}>
        {data?.length < 1 && <p>You haven't taken any quizzes.</p>}
        {isLoading && <p>Loading ...</p>}
        {!isLoading &&
          data?.map((quiz) => (
            <div key={quiz?._id} className={scss.quiz}>
              <div className={scss["quiz-content"]}>
                <div className={scss.header}>
                  <h2>{quiz?.title}</h2>
                  <p>By {quiz?.author}</p>
                </div>
                <p>{quiz?.description}</p>
                <div className={scss.additional}>
                  <p>
                    {quiz?.attempts} Attempt{quiz?.attempts > 1 ? "s" : ""}
                  </p>
                  <p>
                    {quiz?.totalItems} Item{quiz?.totalItems > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button onClick={viewRecordAction(quiz._id)}>View Records</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileQuizzes;
