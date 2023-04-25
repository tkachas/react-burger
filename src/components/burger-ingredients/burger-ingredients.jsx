import React, { useRef, useEffect, useState } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";

import CustomTab from "./custom-tab/custom-tab";
import Card from "./card/card";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedIngredient } from "../../services/slices/ingredients/ingredients-slice";

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

export default function BurgerIngredients() {
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const [currentTab, setCurrentTab] = useState("one");

  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.items);
  const selectedIngredient = useSelector(
    (state) => state.ingredients.selectedIngredient
  );

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
    dispatch(setSelectedIngredient(null));
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const activeTab = getActiveTab(scrollTop, bunsRef, saucesRef, mainsRef);
    setCurrentTab(activeTab);
  };

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <section className={ingredientsStyles.window}>
        <p className={`text text_type_main-large ${ingredientsStyles.heading}`}>
          Соберите бургер
        </p>

        <CustomTab tab={currentTab} change={handleTabChange} />
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
      {selectedIngredient && (
        <Modal handleClose={handleModalClose}>
          <IngredientDetails handleClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
