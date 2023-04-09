import React from "react";
import style from './ingredient-details.module.css'
import {ingredientPropTypes} from "../../../utils/propTypes";

const IngredientDetails = (props) => {
    return (
        <div className={`ml-30 mr-30 mb-15 ${style.contentWrapper}`}>
            <img src={props.ingredient.image_large} alt={'ингредиент'} className="mt-4 mb-4"/>
            <h3 className="text text_type_main-medium mb-8">
                {props.ingredient.name}
            </h3>
            <div className="text text_type_main-default text_color_inactive">
                <ul className={style.nutrition}>
                    <li>
                        <span> Калории,ккал </span>
                        {props.ingredient.calories}
                    </li>
                    <li>
                        <span> Белки, г</span>
                        {props.ingredient.proteins}
                    </li>
                    <li>
                        <span> Жиры, г</span>
                        {props.ingredient.fat}</li>
                    <li>
                        <span> Углеводы, г </span>
                        {props.ingredient.carbohydrates}</li>
                </ul>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientPropTypes.isRequired
}
export default IngredientDetails