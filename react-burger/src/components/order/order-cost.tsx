import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../../pages/feed/order-feed/order-card/order-card.module.css";
import { FC } from "react";
import { TIngredient } from "../../utils/types/ingredient-types";
type OrderCost = { foundIngredients: Array<TIngredient | undefined> };
export const OrderCost: FC<OrderCost> = ({ foundIngredients }) => {
  let totalCost = 0;
  foundIngredients.forEach((foundIngredient) => {
    if (foundIngredient) {
      totalCost += foundIngredient.price;
      if (foundIngredient.type === "bun") {
        totalCost += foundIngredient.price;
      }
    }
  });
  return (
    <div className={`text text_type_digits-default ${style.price}`}>
      <>{totalCost}</>
      <CurrencyIcon type="primary" />
    </div>
  );
};
