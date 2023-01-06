import React from "react";
import scss from "../styles/contentContainer.module.scss";

const ContentContainer = ({ children }) => {
  return <main className={scss["content-container"]}>{children}</main>;
};

export default ContentContainer;
