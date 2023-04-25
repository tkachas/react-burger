import React from "react";
import styles from "../modal.module.css";
import done from "../../../images/done.svg";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const order = useSelector((state) => state.constrState.orderDetails);
  const success = useSelector((state) => state.constrState.success);
  return (
    <>
      <div className={styles.modal_content}>
        <p className={`text text_type_digits-large ${styles.order_id}`}>
          {success && <span>{order.order.number}</span>}
        </p>
        <p className={`"text text_type_digits-small mt-8"`}>
          идентификатор заказа
        </p>
        <div className={`mt-15 mb-15 ${styles.icon_checked_box}`}>
          <img src={done} alt="done" />
        </div>

        <p className="mb-2 text text_type_main-default">
          Ваш заказ начали готовить
        </p>
        <p className="mb-30 text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
}
