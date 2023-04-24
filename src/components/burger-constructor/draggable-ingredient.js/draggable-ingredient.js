import React from "react";
import { useDrag } from "react-dnd";
import ConstructorLayer from "../constructor-layer/constructor-layer";

const DraggableIngredient = ({ layer, type, index }) => {
  const isLocked = type === "top" || type === "bottom";

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: { id: layer._id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (isLocked) {
    return <ConstructorLayer layer={layer} type={type} />;
  }

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <ConstructorLayer layer={layer} type={type} index={index} />
    </div>
  );
};

export default DraggableIngredient;
