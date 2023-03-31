import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
const OrderPrice = (props) => {
    let totalOrderPrice= function(){
        let orderPrice = 0;
        for (let i=0; i<props.addedIngredients.length; i++){
            orderPrice = orderPrice + props.addedIngredients[i].price}
        return orderPrice
    }
    return(
        <div>
            <span className = "text text_type_digits-medium">{totalOrderPrice()}</span>
            <CurrencyIcon type = "primary" />
        </div>
    )
}
export default OrderPrice