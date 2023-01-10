import React from "react";
import { HiPlus } from "react-icons/hi";
import scss from "../../styles/floatingButton.module.scss";

const FloatingButton = ({ className = "", onClick }) => {
  return (
    <button onClick={onClick} className={className} id={scss["add-quiz-btn"]}>
      <HiPlus />
    </button>
  );
};

export default FloatingButton;
