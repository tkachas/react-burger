import React, {useEffect} from 'react';
import modalStyles from './modal.module.css';
import PropTypes from 'prop-types';

import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';

import { createPortal } from "react-dom";

const modalRoot = document.getElementById("react-modals");

export default function Modal({handleClose, modalType, info}) {

  useEffect(() => {
      const closeOnEscape = (e) => (e.key === "Escape" ? handleClose() : null);
      document.body.addEventListener("keydown", closeOnEscape);
      return () => {
        document.body.removeEventListener("keydown", closeOnEscape);
      };
  }, [handleClose]);

  return createPortal(
   <>
    <ModalOverlay handleClose={handleClose}/>
        {modalType === "ingredientDetails" && (
            <div className={modalStyles.modal_wind_ing}>
                <IngredientDetails info={info} handleClose={handleClose}/>
            </div>
        )}
        {modalType === "orderDetails" && (
            <div className={modalStyles.modal_wind_ord}>
                <OrderDetails handleClose={handleClose}/>
            </div>
        )}
   </>
  , modalRoot)
}

function ModalOverlay({ handleClose }) {
    return (
      <div
        className={modalStyles.modal_overlay}
        onClick={handleClose}
        id="modal-overlay"
      ></div>
    );
  }

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  info: PropTypes.object
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
}