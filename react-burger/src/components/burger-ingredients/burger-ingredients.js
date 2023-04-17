import style from "./burger-ingredients.module.css";
import React, { useEffect, useState } from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import TypeOfIngredients from "./type-of-ingredients/type-of-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_INGREDIENT,
  OPEN_INGREDIENT,
} from "../../services/actions/opened-ingredient";

const BurgerIngredients = () => {
  const [tabId, getTabId] = useState("Булки");

  const ingredientsData = useSelector(
    (store) => store.ingredients.ingredientsData
  );
  const { openedIngredient, isOpenModal } = useSelector(
    (store) => store.openedIngredient
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document
      .getElementById(tabId)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [tabId]);

  const handleOpenModal = (ingredient) => {
    dispatch({ type: OPEN_INGREDIENT, ingredient });
  };
  const handleCloseModal = () => {
    dispatch({ type: CLOSE_INGREDIENT });
  };
  const getElementByType = (type, ingredientsData) => {
    return ingredientsData.map((ingredient) => {
      if (ingredient.type === type) {
        return (
          <IngredientCard
            key={ingredient._id}
            ingredient={ingredient}
            handleOpenModal={handleOpenModal}
          />
        );
      }
    });
  };

  return (
    <div className={style.wrapper}>
      {isOpenModal && (
        <Modal onClose={handleCloseModal} header={"Детали ингредиента"}>
          <IngredientDetails ingredient={openedIngredient} />
        </Modal>
      )}
      <IngredientsTab getTabId={getTabId} />
      <div className={`${style.cardsWrapper} ${style.customScroll}`}>
        <div id="Булки">
          <TypeOfIngredients
            header="Булки"
            type="bun"
            getElementByType={getElementByType}
            ingredientsData={ingredientsData}
          />
        </div>
        <div id="Соусы">
          <TypeOfIngredients
            header="Соусы"
            type="sauce"
            getElementByType={getElementByType}
            ingredientsData={ingredientsData}
          />
        </div>
        <div id="Начинки">
          <TypeOfIngredients
            header="Начинки"
            type="main"
            getElementByType={getElementByType}
            ingredientsData={ingredientsData}
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
