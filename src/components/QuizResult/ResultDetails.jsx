import React from "react";
import { fromNow, transformDate } from "../../utils/helpers";
import scss from "../../styles/resultData.module.scss";

const ResultDetails = ({ date, user, score, totalItems, percentage }) => {
  return (
    <div className={scss["result-data"]}>
      <div className={scss.header}>
        <h1>Assessment Result:</h1>
        <p>
          Date: {transformDate(date)} | {fromNow(date)}
        </p>
        <p>{user?.name}</p>
      </div>
      <div className={scss.content}>
        <div className={scss["status-bar"]}>
          <div className={scss.indicator} style={{ width: `${percentage}%` }}>
            {score} / {totalItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
