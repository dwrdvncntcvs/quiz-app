import React from "react";
import { transformDate } from "../../utils/helpers";
import scss from "../../styles/recordsTable.module.scss";

const RecordsTable = ({ quizResultsData }) => {
  return (
    <table className={scss.table}>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Score</th>
          <th>Total Items</th>
          <th>Result</th>
        </tr>
        {quizResultsData?.map(
          ({ date, percentage, score, totalItems, _id }) => (
            <tr key={_id}>
              <td>{transformDate(date)}</td>
              <td>{score}</td>
              <td>{totalItems}</td>
              <td>
                <div className={scss.status}>
                  <div
                    className={scss.indicator}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default RecordsTable;
