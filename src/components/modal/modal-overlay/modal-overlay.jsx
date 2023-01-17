import React from "react";
import PropTypes from "prop-types";
import modalStyles from "../modal.module.css";

export default function ModalOverlay({ handleClose }) {
  return (
    <div
      className={modalStyles.modal_overlay}
      onClick={handleClose}
      id="modal-overlay"
    ></div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
