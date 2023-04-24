import React, { useRef, useEffect } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

import CustomTab from "./custom-tab/custom-tab";
import Card from "./card/card";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";

import {
  setModalOpen,
  setCurrentTab,
} from "../../services/slices/ingredients/ingredients-slice";

function getActiveTab(scrollTop, bunsRef, saucesRef, mainsRef) {
  const bunsTop = bunsRef.current.offsetTop;
  const saucesTop = saucesRef.current.offsetTop;
  const mainsTop = mainsRef.current.offsetTop;

  if (scrollTop >= mainsTop - 50) {
    return "three";
  } else if (scrollTop >= saucesTop - 50) {
    return "two";
  } else {
    return "one";
  }
}

export default function BurgerIngredients(props) {
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.items);
  const modalOpen = useSelector((state) => state.ingredients.modalOpen);

  const bun = ingredients.filter((ingr) => ingr.type === "bun");
  const sauce = ingredients.filter((ingr) => ingr.type === "sauce");
  const main = ingredients.filter((ingr) => ingr.type === "main");

  useEffect(() => {
    const scrollContainer = document.querySelector(
      `.${ingredientsStyles.custom_scroll}`
    );
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleModalClose = () => {
    dispatch(setModalOpen(false));
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const activeTab = getActiveTab(scrollTop, bunsRef, saucesRef, mainsRef);
    dispatch(setCurrentTab(activeTab));
  };

  return (
    <>
      <section className={ingredientsStyles.window}>
        <p className={`text text_type_main-large ${ingredientsStyles.heading}`}>
          Соберите бургер
        </p>

        <CustomTab />
        <div className={ingredientsStyles.custom_scroll}>
          <p
            className={`text text_type_main-medium ${ingredientsStyles.type_sauce}`}
            ref={bunsRef}
          >
            Булки
          </p>
          <div className={ingredientsStyles.cards}>
            {bun.map((a) => (
              <Card type={a} key={a._id} />
            ))}
          </div>
          <p
            className={`text text_type_main-medium ${ingredientsStyles.type_sauce}`}
            ref={saucesRef}
          >
            Соусы
          </p>
          <div className={ingredientsStyles.cards}>
            {sauce.map((a) => (
              <Card type={a} key={a._id} />
            ))}
          </div>
          <p
            className={`text text_type_main-medium ${ingredientsStyles.type_sauce}`}
            ref={mainsRef}
          >
            Начинки
          </p>
          <div className={ingredientsStyles.cards}>
            {main.map((a) => (
              <Card type={a} key={a._id} />
            ))}
          </div>
        </div>
      </section>
      {modalOpen && (
        <Modal handleClose={handleModalClose}>
          <IngredientDetails handleClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array,
};
