import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../../utils/propTypes";

const OrderPrice = (props) => {
    const totalOrderPrice = function () {
        let orderPrice = 0;
        for (let i = 0; i < props.addedIngredients.length; i++) {
            orderPrice = orderPrice + props.addedIngredients[i].price
        }
        return orderPrice
    }
    return (
        <div>
            <span className="text text_type_digits-medium">
                {totalOrderPrice()}
            </span>
            <CurrencyIcon type="primary"/>
        </div>
    )
}
OrderPrice.propTypes = {
    addedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
export default OrderPrice