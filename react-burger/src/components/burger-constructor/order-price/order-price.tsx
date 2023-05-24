import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { FC, useMemo } from "react";
import { TIngredientWithID } from "../../../utils/types/ingredient-types";

const OrderPrice: FC = () => {
  const burgerData: Array<TIngredientWithID> = useSelector(
    (store: any) => store.addedIngredients.addedIngredients
  );
  const orderPrice: number = useMemo<number>(() => {
    return burgerData.reduce(
      (totalPrice: number, ingredient: TIngredientWithID) => {
        if (ingredient.type === "bun") {
          return totalPrice + ingredient.price * 2;
        } else {
          return totalPrice + ingredient.price;
        }
      },
      0
    );
  }, [burgerData]);

  return (
    <div>
      <span className="text text_type_digits-medium">{orderPrice || 0}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};
export default OrderPrice;
