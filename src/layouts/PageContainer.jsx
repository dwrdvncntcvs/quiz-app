import React from "react";
import scss from "../styles/pageContainer.module.scss";

const PageContainer = ({ children }) => {
  return <div className={scss['page-container']}>{children}</div>;
};

export default PageContainer;
