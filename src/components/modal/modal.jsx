import React, { useEffect } from "react";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";

import { createPortal } from "react-dom";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ handleClose, children }) {
  useEffect(() => {
    const closeOnEscape = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, [handleClose]);

  return createPortal(
    <>
      <ModalOverlay handleClose={handleClose} />
      <div className={modalStyles.modal_wind_ing}>
        <div onClick={handleClose} className={modalStyles.close_icon}>
          <CloseIcon />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  info: PropTypes.object,
};
