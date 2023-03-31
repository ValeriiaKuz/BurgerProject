import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import style from './ingredient-card.module.css'

function IngredientCard (props){
    const [count, setCount] = useState(0)
    return(
        <div className = {style.card} onClick = {() => {setCount(count+1); props.getAddedIngredient([...props.addedIngredient, props.ingredient])}}>
            <img className = "pl-4 pr-4" src = {props.ingredient.image}/>
            <span className = "text text_type_digits-default pt-1 pb-1" style = {{display:'flex', flexDirection:'row', gap:'8px'}} >
                {props.ingredient.price}
                <CurrencyIcon type = "primary"/>
            </span>
            <span className = "text text_type_main-default pt-2 pb-5"> {props.ingredient.name} </span>
            {count>0 && <Counter count = {count} size = "default" extraClass = "m-1"/>}
        </div>
    )
}
export default IngredientCard