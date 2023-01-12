import React from "react";
import scss from "../../styles/authHeader.module.scss";

const AuthHeader = ({ title, role = undefined }) => {
  return (
    <>
      <h1 className={scss.title}>{title}</h1>
      {role && (
        <p data-testid="role" className={scss.role}>
          You're a <span>{role}</span>
        </p>
      )}
    </>
  );
};

export default AuthHeader;
