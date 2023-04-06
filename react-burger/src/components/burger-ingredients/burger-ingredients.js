import style from './burger-ingredients.module.css'
import React, {useCallback, useEffect, useState} from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/propTypes";
import TypeOfIngredients from "./type-of-ingredients/type-of-ingredients";
const BurgerIngredients = (props) => {
    const [addedIngredient, getAddedIngredient] = useState([])
    const [tabId, getTabId] = useState("Булки")
    const [bunAdded, setBunAdded] = useState(false)
    useEffect(() => {
        props.getAddedIngredients(addedIngredient)
    }, [addedIngredient])
    useEffect(() => {
        document.getElementById(tabId).scrollIntoView({behavior: "smooth", block: "start"})
    }, [tabId])
    const getElementByType = (type, ingredientsData) => {
        return ingredientsData.map(ingredient => {
            if (ingredient.type === type) {
                return <IngredientCard key={ingredient._id} ingredient={ingredient} addedIngredient={addedIngredient}
                                       getAddedIngredient={getAddedIngredient} bunAdded={bunAdded}
                                       setBunAdded={setBunAdded}/>
            }
        })
    }
    return (
        <div className={style.wrapper}>
            <IngredientsTab getTabId={getTabId}/>
            <div className={`${style.cardsWrapper} ${style.customScroll}`}>
                <div id="Булки">
                    <TypeOfIngredients header='Булки' type='bun' getElementByType={getElementByType}
                           ingredientsData={props.ingredientsData}/>
                </div>
                <div id="Соусы">
                    <TypeOfIngredients header='Соусы' type='sauce' getElementByType={getElementByType}
                           ingredientsData={props.ingredientsData}/>
                </div>
                <div id="Начинки">
                    <TypeOfIngredients header='Начинки' type='main' getElementByType={getElementByType}
                           ingredientsData={props.ingredientsData}/>
                </div>
            </div>
        </div>)
}
BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    getAddedIngredients: PropTypes.func.isRequired,
    addedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
export default BurgerIngredients