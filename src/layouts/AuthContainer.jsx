import React from "react";
import scss from "../styles/authContainer.module.scss";

const AuthContainer = ({ children }) => {
  return <div className={scss["auth-container"]}>{children}</div>;
};

export default AuthContainer;
