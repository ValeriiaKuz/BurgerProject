import style from "../burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ingredientPropTypes } from "../../../utils/propTypes";
import PropTypes from "prop-types";

const MainSauceElement = ({
  ingredient,
  deleteIngredient,
  index,
  moveListItem,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={style.withIcon} ref={dragDropRef} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          deleteIngredient(ingredient.id, ingredient.price);
        }}
      />
    </div>
  );
};
MainSauceElement.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  moveListItem: PropTypes.func.isRequired,
};
export default MainSauceElement;
