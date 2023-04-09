import style from "../burger-ingredients.module.css";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../../utils/propTypes";

const TypeOfIngredients = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">{props.header}</h2>
            <div className={style.cards}>
                {props.getElementByType(props.type, props.ingredientsData)}
            </div>
        </div>
    )
}
TypeOfIngredients.propTypes = {
    header: PropTypes.string,
    type: PropTypes.string,
    getElementByType: PropTypes.func.isRequired,
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
export default TypeOfIngredients