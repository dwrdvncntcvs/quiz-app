import React from "react";
import scss from "../styles/mainContainer.module.scss";

const MainContainer = ({ children }) => {
  return <div className={scss["main-container"]}>{children}</div>;
};

export default MainContainer;
