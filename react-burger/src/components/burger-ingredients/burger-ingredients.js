import style from './burger-ingredients.module.css'
import React, {useRef, useState} from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";

const BurgerIngredients = (props) =>{
    const [addedIngredient, getAddedIngredient]=useState([]);
    props.getAddedIngredients(addedIngredient)
    let getElementByType = (type, props) => {
        let cardArray = props.ingredientsData.map((ingredient, index) => {
            if (ingredient.type === type) {
                return <IngredientCard key={index} ingredient={ingredient} addedIngredient={addedIngredient} getAddedIngredient={getAddedIngredient}/>
            }
        })
        return cardArray}

    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    function handleTabClick(ref) {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className={style.ingredients}>
            <IngredientsTab handleTabClick={handleTabClick} bun={bunRef} sauce={sauceRef} main={mainRef}/>
            <div className={style.cardsWrapper+' '+style.customScroll}>
                <BunCards  getElementByType={getElementByType} props={props}/>
                <SauceCards ref={sauceRef} getElementByType={getElementByType} props={props}/>
                <MainCards ref={mainRef} getElementByType={getElementByType} props={props}/>
            </div>
        </div>)
}
const SauceCards = (props) => {
    return(
        <div>
            <h2 className="mt-10 mb-6">Соусы</h2>
            <div className={style.cards}>
                {props.getElementByType('sauce', props.props)}
            </div>
        </div>
    )
}
const BunCards = (props) => {
    return(
        <div >
            <h2 className="mt-10 mb-6">Булки</h2>
            <div className={style.cards}>
                {props.getElementByType('bun', props.props)}
            </div>
        </div>
    )
}
const MainCards = (props) => {
    return(
        <div>
            <h2 className="mt-10 mb-6">Начинки</h2>
            <div className={style.cards}>
                {props.getElementByType('main', props.props)}
            </div>
        </div>
    )
}
export default BurgerIngredients