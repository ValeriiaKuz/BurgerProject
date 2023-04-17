import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const OrderPrice = () => {
  const orderPrice = useSelector((store) => store.addedIngredients.orderPrice);
  return (
    <div>
      <span className="text text_type_digits-medium">{orderPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};
export default OrderPrice;
