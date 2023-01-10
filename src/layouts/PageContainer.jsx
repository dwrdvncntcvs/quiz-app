import React from "react";
import scss from "../styles/pageContainer.module.scss";

const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`${scss["page-container"]} ${className}`}>{children}</div>
  );
};

export default PageContainer;
