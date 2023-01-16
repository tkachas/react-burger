import React from 'react';
import cardStyles from './card.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Card(props) {
  const [count, setCount] = React.useState(1);

  const handleModalOpen = () => {
    props.handleOpen(true);
    props.clickedItem(props.type);
  }

  return (
    <div className={cardStyles.card} onClick={handleModalOpen}>
      <Counter count={count} size="default" extraClass="m-1" />
      <img
        className="ml-4 mr-4"
        src={props.type.image}
        alt={props.type.name}
      />
      <div className={cardStyles.price}>
          <p className="text text_type_digits-default" style={{marginRight: 10}}>
              {props.type.price}
          </p>
          <CurrencyIcon/>
      </div>
      <p className="text text_type_main-default" style={{textAlign: 'center'}}>
          {props.type.name}
      </p>
    </div>
  )
}
