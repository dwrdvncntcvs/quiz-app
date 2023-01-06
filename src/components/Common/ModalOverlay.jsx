import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { destroyModal } from "../../features/slice/modalSlice";
import scss from "../../styles/modalOverlay.module.scss";

const Backdrop = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(destroyModal());
  };

  return <div className={scss.backdrop} onClick={closeModal} />;
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
