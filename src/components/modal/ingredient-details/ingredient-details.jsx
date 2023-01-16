import React from "react";
import styles from "../modal.module.css";
import PropTypes from "prop-types";

export default function IngredientDetails({ info }) {
  return (
    <>
      <div className={styles.modal_header}>
        <p className="text text_type_main-large">Детали ингредиента</p>
      </div>
      <div className={styles.modal_content}>
        <img src={info.image_large} alt={info.name} className={styles.image} />
        <p className="mt-4 mb-8 text text_type_main-medium">{info.name}</p>
        <div className={`mb-10 ${styles.composition}`}>
          <div className={"mr-5"}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {info.calories}
            </p>
          </div>
          <div className={"mr-5"}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {info.proteins}
            </p>
          </div>
          <div className={"mr-5"}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {info.fat}
            </p>
          </div>
          <div>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {info.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  info: PropTypes.object,
};
