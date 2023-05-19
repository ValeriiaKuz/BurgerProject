import style from "../burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/propTypes";
import IngredientCard from "../ingredient-card/ingredient-card";
import { Link, useLocation } from "react-router-dom";

const TypeOfIngredients = ({ header, ingredients }) => {
  return (
    <div>
      <h2 className="mt-10 mb-6">{header}</h2>
      <div className={style.cards}>
        {ingredients.map((ingredient) => {
          return (
            <IngredientCard
              key={ingredient._id}
              draggable
              ingredient={ingredient}
            />
          );
        })}
      </div>
    </div>
  );
};
TypeOfIngredients.propTypes = {
  header: PropTypes.string,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
export default TypeOfIngredients;
