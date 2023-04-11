import style from "../burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/propTypes";

const TypeOfIngredients = ({
  header,
  type,
  getElementByType,
  ingredientsData,
}) => {
  return (
    <div>
      <h2 className="mt-10 mb-6">{header}</h2>
      <div className={style.cards}>
        {getElementByType(type, ingredientsData)}
      </div>
    </div>
  );
};
TypeOfIngredients.propTypes = {
  header: PropTypes.string,
  type: PropTypes.string,
  getElementByType: PropTypes.func.isRequired,
  ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
export default TypeOfIngredients;
