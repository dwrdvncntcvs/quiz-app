import React from "react";
import { createPortal } from "react-dom";
import scss from "../../styles/modalOverlay.module.scss";

const Backdrop = () => {
  return <div className={scss.backdrop} />;
};

const Modal = ({ children }) => {
  return <div className={scss.modal}>{children}</div>;
};

const ModalOverlay = ({ children }) => {
  return createPortal(
    <>
      <Backdrop />
      <Modal>{children}</Modal>
    </>,
    document.getElementById("overlay")
  );
};

export default ModalOverlay;
