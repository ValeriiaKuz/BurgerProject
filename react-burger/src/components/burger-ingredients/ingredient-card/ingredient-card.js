import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/propTypes";

function IngredientCard(props) {
  const {
    ingredient,
    addedIngredient,
    getAddedIngredient,
    bunAdded,
    setBunAdded,
    handleOpenModal,
    orderPriceDispatcher,
  } = props;
  const [count, setCount] = useState(0);
  return (
    <div>
      <div
        className={style.card}
        onClick={() => {
          handleOpenModal(ingredient);
          if (ingredient.type === "bun") {
            if (bunAdded === false) {
              setCount(1);
              setBunAdded(true);
              getAddedIngredient([...addedIngredient, ingredient]);
              orderPriceDispatcher({
                type: "bun",
                ingredient: ingredient,
              });
            }
          } else if (ingredient.type !== "bun") {
            setCount(count + 1);
            getAddedIngredient([...addedIngredient, ingredient]);
            orderPriceDispatcher({
              type: "another",
              ingredient: ingredient,
            });
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
  addedIngredient: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  getAddedIngredient: PropTypes.func.isRequired,
  bunAdded: PropTypes.bool.isRequired,
  setBunAdded: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  orderPriceDispatcher: PropTypes.func.isRequired,
};
export default IngredientCard;
