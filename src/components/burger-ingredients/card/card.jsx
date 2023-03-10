import React from "react";
import cardStyles from "./card.module.css";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Card(props) {
  const [count, setCount] = React.useState(1);

  const handleModalOpen = () => {
    props.handleOpen(true);
    props.clickedItem(props.type);
  };

  return (
    <div className={cardStyles.card} onClick={handleModalOpen}>
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
