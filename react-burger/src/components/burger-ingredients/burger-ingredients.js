import style from './burger-ingredients.module.css'
import React, {useEffect, useState} from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/propTypes";


const BurgerIngredients = (props) => {

    const [addedIngredient, getAddedIngredient] = useState([]);

    useEffect(() => {
        props.getAddedIngredients(addedIngredient)
    }, [addedIngredient])

    const [tabId, getTabId] = useState("Булки")
    useEffect(() => {
        document.getElementById(tabId).scrollIntoView({behavior: "smooth", block: "start"})
    }, [tabId])

    const [bunAdded, setBunAdded] = useState(false)

    const getElementByType = (type, ingredientsData) => {
        return ingredientsData.map((ingredient, index) => {
            if (ingredient.type === type) {
                return <IngredientCard key={index} ingredient={ingredient} addedIngredient={addedIngredient}
                                       getAddedIngredient={getAddedIngredient} bunAdded={bunAdded}
                                       setBunAdded={setBunAdded} />
            }
        })
    }
    return (
        <div className={style.wrapper}>
            <IngredientsTab getTabId={getTabId}/>
            <div className={style.cardsWrapper + ' ' + style.customScroll}>
                <div id="Булки">
                    <BunCards getElementByType={getElementByType} ingredientsData={props.ingredientsData}/>
                </div>
                <div id="Соусы">
                    <SauceCards getElementByType={getElementByType} ingredientsData={props.ingredientsData}/>
                </div>
                <div id="Начинки">
                    <MainCards getElementByType={getElementByType} ingredientsData={props.ingredientsData}/>
                </div>
            </div>
        </div>)
}
const SauceCards = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">Соусы</h2>
            <div className={style.cards}>
                {props.getElementByType('sauce', props.ingredientsData)}
            </div>
        </div>
    )
}
const BunCards = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">Булки</h2>
            <div className={style.cards}>
                {props.getElementByType('bun', props.ingredientsData)}
            </div>
        </div>
    )
}
const MainCards = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">Начинки</h2>
            <div className={style.cards}>
                {props.getElementByType('main', props.ingredientsData)}
            </div>
        </div>
    )
}
BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    getAddedIngredients: PropTypes.func.isRequired,
    addedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
BunCards.propTypes = {
    getElementByType: PropTypes.func.isRequired,
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

MainCards.propTypes = {
    getElementByType: PropTypes.func.isRequired,
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
SauceCards.propTypes = {
    getElementByType: PropTypes.func.isRequired,
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default BurgerIngredients