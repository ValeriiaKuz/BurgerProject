import style from "../burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import React, { FC, useRef } from "react";
import { TIngredientWithID } from "../../../utils/types/ingredient-types";

type MainSauceElementPropsType = {
  ingredient: TIngredientWithID;
  deleteIngredient: (id: string) => void;
  index: number;
  moveListItem: (dragIndex: number, hoverIndex: number) => void;
};
const MainSauceElement: FC<MainSauceElementPropsType> = ({
  ingredient,
  deleteIngredient,
  index,
  moveListItem,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY: number =
        (monitor.getClientOffset() as { x: number; y: number }).y -
        hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const ref = useRef<HTMLDivElement>(null);
  const dragDropRef = dragRef(dropRef(ref)) as React.LegacyRef<HTMLDivElement>;
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={style.withIcon} ref={dragDropRef} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          deleteIngredient(ingredient.id);
        }}
      />
    </div>
  );
};

export default MainSauceElement;
