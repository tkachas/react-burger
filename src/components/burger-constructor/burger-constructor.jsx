import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";

import ConstructorLayer from "./constructor-layer/constructor-layer";
import DraggableIngredient from "./draggable-ingredient.js/draggable-ingredient";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  countPrice,
  setOrderModalOpen,
} from "../../services/slices/constructor/constructor-slice";
import { useDrop } from "react-dnd";

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const addedIngredients = useSelector(
    (state) => state.constrState.addedIngredients
  );
  const ingredients = useSelector((state) => state.ingredients.items);
  const orderModalOpen = useSelector(
    (state) => state.constrState.orderModalOpen
  );

  const finalPrice = () => {
    if (!addedIngredients.length) return 0;
    let sum = 0;
    addedIngredients.map((el) => {
      if (el.type === "bun") {
        sum += el.price * 2;
      } else {
        sum += el.price;
      }
    });
    return sum;
  };

  const bun = ingredients.filter((ingr) => ingr.type === "bun");
  const sauce = ingredients.filter((ingr) => ingr.type === "sauce");
  const main = ingredients.filter((ingr) => ingr.type === "main");

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ingredient",
    drop: (item, monitor) => {
      // Обработка перетаскивания ингредиента, добавление его в конструктор бургера
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const sortedIngredients = React.useMemo(() => {
    const bun = addedIngredients.find(
      (ingredient) => ingredient.type === "bun"
    );

    // Убираем булку из списка ингредиентов
    const nonBunIngredients = addedIngredients.filter(
      (ingredient) => ingredient.type !== "bun"
    );

    if (bun) {
      // Добавляем свойство bunType к булкам
      const topBun = { ...bun, bunType: "top" };
      const bottomBun = { ...bun, bunType: "bottom" };

      // Вставляем булки в начало и конец списка ингредиентов
      return [topBun, ...nonBunIngredients, bottomBun];
    } else {
      return nonBunIngredients;
    }
  }, [addedIngredients]);

  const handleModalOpen = () => {
    dispatch(setOrderModalOpen(true));
  };

  const handleModalClose = () => {
    dispatch(setOrderModalOpen(false));
  };

  return (
    <>
      <section className={constructorStyles.window}>
        <div
          className={`${constructorStyles.inner_constr} ${
            addedIngredients.length ? "" : constructorStyles.empty
          } ${canDrop ? constructorStyles.empty : ""}`}
          ref={drop}
          style={isOver ? { backgroundColor: "#232328" } : {}}
        >
          {/* <ConstructorLayer type={"top"} layer={bun[0]} />
          <ConstructorLayer layer={sauce[0]} />
          <ConstructorLayer layer={main[0]} />
          <ConstructorLayer layer={sauce[1]} />
          <ConstructorLayer layer={main[1]} />
          <ConstructorLayer type={"bottom"} layer={bun[0]} /> */}
          {sortedIngredients.length ? (
            sortedIngredients.map((el, key) => {
              let type = null;
              if (el.type === "bun" && key === 0) {
                type = "top";
              } else if (
                el.type === "bun" &&
                key === sortedIngredients.length - 1
              ) {
                type = "bottom";
              }
              return (
                <ConstructorLayer
                  layer={el}
                  type={type}
                  key={`${el._id}-${key}`}
                  index={key}
                />
              );
            })
          ) : (
            <p></p>
          )}
        </div>
        <div className={constructorStyles.final_price}>
          <div className={`mr-10 ${constructorStyles.total}`}>
            <p className="text text_type_digits-medium">{finalPrice()}</p>
            <CurrencyIcon type="primary" className={constructorStyles.icon} />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleModalOpen}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {orderModalOpen && (
        <Modal handleClose={handleModalClose}>
          <OrderDetails handleClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
