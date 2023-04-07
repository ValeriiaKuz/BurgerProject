import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import style from './ingredient-card.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../../utils/propTypes";

function IngredientCard(props) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <div className={style.card} onClick={
                () => {
                    props.handleOpenModal(props.ingredient)
                    if (props.ingredient.type === 'bun') {
                        if (props.bunAdded === false) {
                            setCount(1);
                            props.setBunAdded(true);
                            props.getAddedIngredient([...props.addedIngredient, props.ingredient])
                        }
                    } else if (props.ingredient.type !== 'bun') {
                        setCount(count + 1);
                        props.getAddedIngredient([...props.addedIngredient, props.ingredient])
                    }
                }
            }>
                <img className="pl-4 pr-4" src={props.ingredient.image} alt={'Ингредиент'}/>
                <span className={`text text_type_digits-default pt-1 pb-1 ${style.price}`}>
                    {props.ingredient.price}
                    <CurrencyIcon type="primary"/>
                </span>
                <span className="text text_type_main-default pt-2 pb-5">
                    {props.ingredient.name}
                </span>
                {count > 0 &&
                    <Counter count={count} size="default" extraClass="m-1"/>
                }
            </div>
        </div>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    addedIngredient: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    getAddedIngredient: PropTypes.func.isRequired,
    bunAdded: PropTypes.bool.isRequired,
    setBunAdded: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired
}
export default IngredientCard