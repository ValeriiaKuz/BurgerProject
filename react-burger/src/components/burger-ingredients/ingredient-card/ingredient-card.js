import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./ingredient-card.module.css";
import { ingredientPropTypes } from "../../../utils/propTypes";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { NavLink, useLocation } from "react-router-dom";

function IngredientCard({ ingredient }) {
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
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  let location = useLocation();
  return (
    <NavLink
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={style.navLink}
    >
      <div ref={dragRef} style={{ opacity }}>
        <div className={style.card}>
          <img
            className="pl-4 pr-4"
            src={ingredient.image}
            alt={"Ингредиент"}
          />
          <span
            className={`text text_type_digits-default pt-1 pb-1 ${style.price}`}
          >
            {ingredient.price}
            <CurrencyIcon type="primary" />
          </span>
          <span className="text text_type_main-default pt-2 pb-5">
            {ingredient.name}
          </span>
          {count > 0 && (
            <Counter count={count} size="default" extraClass="m-1" />
          )}
        </div>
      </div>
    </NavLink>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
export default React.memo(IngredientCard);
