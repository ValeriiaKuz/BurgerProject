import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../../pages/feed/order-feed/order-card/order-card.module.css";
import { FC } from "react";
import { TIngredient } from "../../utils/types/ingredient-types";
type OrderCost = {
  foundIngredients: Array<TIngredient | undefined>;
  count?: number;
};
export const OrderCost: FC<OrderCost> = ({ foundIngredients, count }) => {
  let totalCost = foundIngredients.reduce((sum, foundIngredient) => {
    if (foundIngredient) {
      sum += foundIngredient.price;
    }
    return sum;
  }, 0);
  return (
    <div className={`text text_type_digits-default ${style.price}`}>
      {count ? (
        <span>
          {count} X {foundIngredients[0]?.price}
        </span>
      ) : (
        <>{totalCost}</>
      )}
      <CurrencyIcon type="primary" />
    </div>
  );
};
