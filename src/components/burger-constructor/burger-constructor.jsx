import React, { useMemo } from "react";
import constructorStyles from "./burger-constructor.module.css";

import ConstructorLayer from "./constructor-layer/constructor-layer";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  clearOrder,
  getOrder,
} from "../../services/slices/constructor/constructor-slice";
import { useDrop } from "react-dnd";

import uuid from "react-uuid";

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const addedIngredients = useSelector(
    (state) => state.constrState.addedIngredients
  );
  const orderDetails = useSelector((state) => state.constrState.orderDetails);

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

  const finalPrice = useMemo(() => {
    if (!addedIngredients.length) return 0;
    let sum = 0;
    addedIngredients.map((el) => (sum += el.price));
    return sum;
  }, [addedIngredients]);

  const handleModalOpen = () => {
    const ingredientIds = addedIngredients.map((el) => el._id);
    dispatch(getOrder(ingredientIds));
  };

  const handleModalClose = () => {
    dispatch(clearOrder(null));
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
          {addedIngredients.length ? (
            addedIngredients.map((el, key) => {
              let type = null;
              if (el.type === "bun" && key === 0) {
                type = "top";
              } else if (
                el.type === "bun" &&
                key === addedIngredients.length - 1
              ) {
                type = "bottom";
              }
              return (
                <ConstructorLayer
                  layer={el}
                  type={type}
                  key={uuid()}
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
            <p className="text text_type_digits-medium">{finalPrice}</p>
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
      {orderDetails && (
        <Modal handleClose={handleModalClose}>
          <OrderDetails handleClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
