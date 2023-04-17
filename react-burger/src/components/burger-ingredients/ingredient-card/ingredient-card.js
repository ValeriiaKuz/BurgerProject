import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/propTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BUN,
  ADD_INGREDIENT,
} from "../../../services/actions/add-ingredient";

function IngredientCard({ ingredient, handleOpenModal }) {
  const dispatch = useDispatch();
  const addIngredient = () => {
    dispatch({
      type: ADD_INGREDIENT,
      addedIngredient: ingredient,
    });
  };
  const setBunAdd = () => {
    dispatch({ type: ADD_BUN });
  };
  const bunAdded = useSelector((store) => store.addedIngredients.bunAdded);
  const [count, setCount] = useState(0);
  return (
    <div>
      <div
        className={style.card}
        onClick={() => {
          handleOpenModal(ingredient);
          if (ingredient.type === "bun") {
            if (bunAdded === false) {
              setCount(2);
              setBunAdd();
              addIngredient();
            }
          } else if (ingredient.type !== "bun") {
            setCount(count + 1);
            addIngredient();
          }
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
