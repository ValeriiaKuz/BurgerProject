import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useContext } from "react";
import { IngredientsContext } from "../../../services/ingredients-context";

const OrderPrice = ({ orderPrice }) => {
  return (
    <div>
      <span className="text text_type_digits-medium">{orderPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};
OrderPrice.propTypes = {
  orderPrice: PropTypes.number.isRequired,
};
export default OrderPrice;
