import style from './burger-ingredients.module.css'
import React, {useEffect, useState} from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/propTypes";
import TypeOfIngredients from "./type-of-ingredients/type-of-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";

const BurgerIngredients = (props) => {
    const [addedIngredient, getAddedIngredient] = useState([])
    const [tabId, getTabId] = useState("Булки")
    const [bunAdded, setBunAdded] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [openedIngredient, setOpenedIngredient] = useState({})

    useEffect(() => {
        props.getAddedIngredients(addedIngredient)
    }, [addedIngredient])
    useEffect(() => {
        document.getElementById(tabId).scrollIntoView({behavior: "smooth", block: "start"})
    }, [tabId])
    const getElementByType = (type, ingredientsData) => {
        return ingredientsData.map(ingredient => {
            if (ingredient.type === type) {
                return (<IngredientCard key={ingredient._id} ingredient={ingredient} addedIngredient={addedIngredient}
                                        getAddedIngredient={getAddedIngredient} bunAdded={bunAdded}
                                        setBunAdded={setBunAdded} handleOpenModal={handleOpenModal}/>)
            }
        })
    }
    const handleOpenModal = (ingredient) => {
        setIsOpenModal(true)
        setOpenedIngredient(ingredient)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div className={style.wrapper}>
            {isOpenModal &&
                <Modal onClose={handleCloseModal} header={'Детали ингредиента'}>
                    <IngredientDetails ingredient={openedIngredient}/>
                </Modal>
            }
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