import style from './burger-ingredients.module.css'
import React, {useEffect, useState} from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";

const BurgerIngredients = (props) => {
    const [addedIngredient, getAddedIngredient] = useState([]);
    useEffect(() => {
        props.getAddedIngredients(addedIngredient)
    }, [addedIngredient])

    const [tabId, getTabId] = useState("Булки")
    useEffect(() => {
        document.getElementById(tabId).scrollIntoView({behavior: "smooth", block: "start"})
    }, [tabId])

    const [bunAdded, setBunAdded] = useState("false")
    const getElementByType = (type, props) => {
        const cardArray = props.ingredientsData.map((ingredient, index) => {
            if (ingredient.type === type) {
                return <IngredientCard key={index} ingredient={ingredient} addedIngredient={addedIngredient}
                                       getAddedIngredient={getAddedIngredient} bunAdded={bunAdded}
                                       setBunAdded={setBunAdded}/>
            }
        })
        return cardArray
    }
    return (
        <div className={style.wrapper}>
            <IngredientsTab getTabId={getTabId}/>
            <div className={style.cardsWrapper + ' ' + style.customScroll}>
                <div id="Булки">
                    <BunCards getElementByType={getElementByType} props={props}/>
                </div>
                <div id="Соусы">
                    <SauceCards getElementByType={getElementByType} props={props}/>
                </div>
                <div id="Начинки">
                    <MainCards getElementByType={getElementByType} props={props}/>
                </div>
            </div>
        </div>)
}
const SauceCards = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">Соусы</h2>
            <div className={style.cards}>
                {props.getElementByType('sauce', props.props)}
            </div>
        </div>
    )
}
const BunCards = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">Булки</h2>
            <div className={style.cards}>
                {props.getElementByType('bun', props.props)}
            </div>
        </div>
    )
}
const MainCards = (props) => {
    return (
        <div>
            <h2 className="mt-10 mb-6">Начинки</h2>
            <div className={style.cards}>
                {props.getElementByType('main', props.props)}
            </div>
        </div>
    )
}
export default BurgerIngredients