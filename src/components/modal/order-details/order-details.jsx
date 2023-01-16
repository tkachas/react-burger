import React from 'react';
import styles from '../modal.module.css';
import done from '../../../images/done.svg';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails() {
  return (
    <>
        <div className={styles.modal_header} style={{marginTop: 20}}>
        <p className="text text_type_main-large" style={{textAlign: 'start'}}>
            
        </p>
        <CloseIcon/>
        </div>
        <div className={styles.modal_content}>
      <p className={`text text_type_digits-large ${styles.order_id}`}>
        {"034536"}
      </p>
      <p
        className={`"text text_type_digits-small mt-8"`}
      >
        идентификатор заказа
      </p>
      <div className={`mt-15 mb-15 ${styles.icon_checked_box}`}>
        <img src={done} alt="done"/>
      </div>

      <p className="mb-2 text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className="mb-30 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
    </>
  )
}
