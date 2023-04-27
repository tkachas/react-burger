import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  deleteIngredient,
  reorderIngredient,
} from "../../../services/slices/constructor/constructor-slice";
import layerStyles from "./constructor-layer.module.css";

export default function ConstructorLayer(props) {
  const isLocked = props.type === "top" || props.type === "bottom";
  const ref = useRef(null);

  const dispatch = useDispatch();

  const nameAddition = (name) => {
    if (props.type === "top") return name + " (верх)";
    if (props.type === "bottom") return name + " (низ)";
    return name;
  };

  const handleDelete = () => {
    dispatch(deleteIngredient(props.index));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(
        reorderIngredient({
          sourceIndex: dragIndex,
          destinationIndex: hoverIndex,
        })
      );
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      let id = props.layer._id;
      let index = props.index;
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={layerStyles.card}
      ref={props.type === "top" || props.type === "bottom" ? null : ref}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {!isLocked ? <DragIcon type="primary" /> : <div></div>}
      <div className={layerStyles.layer}>
        <ConstructorElement
          type={props.type}
          isLocked={isLocked}
          text={nameAddition(props.layer.name)}
          price={props.layer.price}
          thumbnail={props.layer.image}
          handleClose={handleDelete}
        />
      </div>
    </div>
  );
}

ConstructorLayer.propTypes = {
  type: PropTypes.string,
  index: PropTypes.number.isRequired,
};
