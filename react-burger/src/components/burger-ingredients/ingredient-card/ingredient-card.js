import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/propTypes";
import { useDispatch, useSelector } from "react-redux";
import { addIngredientAC } from "../../../services/actions/add-ingredient";
import { useDrag } from "react-dnd";

function IngredientCard({ ingredient, handleOpenModal }) {
  const addedIngredients = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );
  const countTotal = () => {
    let count = 0;
    for (let i = 0; i < addedIngredients.length; i++) {
      if (addedIngredients[i]._id === ingredient._id) {
        if (ingredient.type === "bun") {
          count = count + 2;
        } else {
          count = count + 1;
        }
      }
    }
    return count;
  };

  const count = countTotal();

  const dispatch = useDispatch();
  const addIngredient = (ingredient) => {
    dispatch(addIngredientAC(ingredient));
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={dragRef} style={{ opacity }}>
      <div
        className={style.card}
        onClick={() => {
          handleOpenModal(ingredient);
          addIngredient(ingredient);
        }}
      >
        <img className="pl-4 pr-4" src={ingredient.image} alt={"Ингредиент"} />
        <span
          className={`text text_type_digits-default pt-1 pb-1 ${style.price}`}
        >
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
        <span className="text text_type_main-default pt-2 pb-5">
          {ingredient.name}
        </span>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};
export default React.memo(IngredientCard);
