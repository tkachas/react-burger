import React from 'react';
import constructorStyles from './burger-constructor.module.css';

import ConstructorLayer from './constructor-layer/constructor-layer';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor(props) {
  const bun = props.ingredients.filter((ingr) => ingr.type === "bun");
  const sauce = props.ingredients.filter((ingr) => ingr.type === "sauce");
  const main = props.ingredients.filter((ingr) => ingr.type === "main");
  return (
    <section className={constructorStyles.window}>
        <div className={constructorStyles.inner_constr}>
            <ConstructorLayer type={"top"} layer={bun[0]}/>
            <ConstructorLayer layer={sauce[0]}/>
            <ConstructorLayer layer={main[0]}/>
            <ConstructorLayer layer={sauce[1]}/>
            <ConstructorLayer layer={main[1]}/>
            <ConstructorLayer type={"bottom"} layer={bun[0]}/>
        </div>
        <div className={constructorStyles.final_price}>
          <div className={`mr-10 ${constructorStyles.total}`}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" className={constructorStyles.icon} />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
    </section>
  )
}
