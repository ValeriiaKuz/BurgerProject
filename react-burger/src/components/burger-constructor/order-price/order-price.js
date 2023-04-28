import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const OrderPrice = () => {
  const burgerData = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );

  const orderPrice = useMemo(() => {
    return burgerData.reduce((totalPrice, ingredient) => {
      if (ingredient.type === "bun") {
        return totalPrice + ingredient.price * 2;
      } else {
        return totalPrice + ingredient.price;
      }
    }, 0);
  }, [burgerData]);

  return (
    <div>
      <span className="text text_type_digits-medium">
        {orderPrice ? orderPrice : 0}
      </span>
      <CurrencyIcon type="primary" />
    </div>
  );
};
export default OrderPrice;
