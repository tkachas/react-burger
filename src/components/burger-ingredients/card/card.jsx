import React from "react";
import cardStyles from "./card.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalOpen,
  setSelectedIngredient,
} from "../../../services/slices/ingredients/ingredients-slice";
import { addIngredient } from "../../../services/slices/constructor/constructor-slice";

export default function Card(props) {
  const addedIngredients = useSelector(
    (state) => state.constrState.addedIngredients
  );

  const count = addedIngredients.reduce(
    (acc, ingredient) => (ingredient._id === props.type._id ? acc + 1 : acc),
    0
  );

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: { ...props.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleModalOpen = () => {
    dispatch(setModalOpen(true));
    dispatch(setSelectedIngredient(props.type));
  };

  return (
    <div
      className={cardStyles.card}
      onClick={handleModalOpen}
      draggable
      ref={drag}
    >
      <Counter count={count} size="default" extraClass="m-1" />
      <img className="ml-4 mr-4" src={props.type.image} alt={props.type.name} />
      <div className={cardStyles.price}>
        <p
          className={`text text_type_digits-default ${cardStyles.price_number}`}
        >
          {props.type.price}
        </p>
        <CurrencyIcon />
      </div>
      <p className={`text text_type_main-default ${cardStyles.name}`}>
        {props.type.name}
      </p>
    </div>
  );
}

Card.propTypes = {
  type: PropTypes.object,
  handleOpen: PropTypes.func,
  clickedItem: PropTypes.func,
};
