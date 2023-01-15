import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import layerStyles from './constructor-layer.module.css';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ConstructorLayer(props) {
  const [isLocked, setIsLocked] = React.useState(false);
  const [isMiddle, setIsMiddle] = React.useState(false);

  React.useEffect(()=>{
    if (props.type === "top" || props.type === "bottom") {
      setIsLocked(true);
    } else {
      setIsMiddle(true);
    }
  }, [props.type]);

  const nameAddition = (name) => {
    if (props.type === "top") {
      return (name += ' (верх)');
    }
    else if (props.type === "bottom") {
      return (name += ' (низ)');
    } else {
      return name;
    }
  }

  return (
    <div className={layerStyles.card}>
    {isMiddle ? (
        <DragIcon type="primary" />
      ) : <div></div>}
      <div className={layerStyles.layer}>
      <ConstructorElement
        type={props.type}
        isLocked={isLocked}
        text={nameAddition(props.layer.name)}
        price={props.layer.price}
        thumbnail={props.layer.image}
      />
      </div>
    </div>
  )
}
