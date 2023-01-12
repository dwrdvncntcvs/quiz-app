import React from "react";
import { Link } from "react-router-dom";
import scss from "../../styles/invalidRole.module.scss";

const InvalidRole = ({ role }) => {
  return (
    <div className={scss["invalid-role"]}>
      <div>
        <p className={scss["message-1"]}>Oops...</p>
        <p data-testid="message" className={scss["message-2"]}>
          This "<span>{role.toUpperCase()}</span>" is not a role on the
          application.
        </p>
      </div>
      <div className={scss.choose}>
        <Link to={"/sign-up/quizzer"}>Quizzer</Link>
        <Link to={"/sign-up/quizee"}>Quizee</Link>
      </div>
    </div>
  );
};

export default InvalidRole;
