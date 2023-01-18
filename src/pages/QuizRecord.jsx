import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecordsTable from "../components/Records/RecordsTable";
import { useAuth } from "../features/slice/authSlice";
import { useGetQuizRecordsQuery } from "../services/quizResult";
import scss from "../styles/quizRecord.module.scss";
import { transformDate } from "../utils/helpers";

const QuizRecord = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: quizRecords, refetch: refetchQuizRecords } =
    useGetQuizRecordsQuery({
      userId: user._id,
      quizId: location.state?.quizId,
    });

  useEffect(() => {
    refetchQuizRecords();
  }, [refetchQuizRecords]);

  const goBack = () => {
    navigate(location.state.from);
  };

  return (
    <>
      <div className={scss.backdrop} onClick={goBack}></div>
      <div className={scss.modal}>
        <div className={scss.record}>
          <h1>{quizRecords?.quiz.title} Records</h1>
          <RecordsTable quizResultsData={quizRecords?.quizResultsData} />
        </div>
      </div>
    </>
  );
};

export default QuizRecord;
