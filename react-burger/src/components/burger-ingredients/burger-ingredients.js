import style from "./burger-ingredients.module.css";
import React, { useEffect, useMemo, useState } from "react";
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

  const sauces = useMemo(
    () => ingredientsData.filter((ingredient) => ingredient.type === "sauce"),
    [ingredientsData]
  );
  const buns = useMemo(
    () => ingredientsData.filter((ingredient) => ingredient.type === "bun"),
    [ingredientsData]
  );
  const mains = useMemo(
    () => ingredientsData.filter((ingredient) => ingredient.type === "main"),
    [ingredientsData]
  );

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getTabId(entry.target.id);
        }
      });
    };
    const options = {
      root: document.getElementById("wrapper"),
      rootMargin: "0px 0px -90% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(callback, options);
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <div className={style.wrapper}>
      {isOpenModal && (
        <Modal onClose={handleCloseModal} header={"Детали ингредиента"}>
          <IngredientDetails ingredient={openedIngredient} />
        </Modal>
      )}
      <IngredientsTab getTabId={getTabId} tabId={tabId} />
      <div
        className={`${style.cardsWrapper} ${style.customScroll}`}
        id="wrapper"
      >
        <div id="Булки" className="section">
          <TypeOfIngredients
            header="Булки"
            ingredients={buns}
            handleOpenModal={handleOpenModal}
          />
        </div>
        <div id="Соусы" className="section">
          <TypeOfIngredients
            header="Соусы"
            ingredients={sauces}
            handleOpenModal={handleOpenModal}
          />
        </div>
        <div id="Начинки" className="section">
          <TypeOfIngredients
            header="Начинки"
            ingredients={mains}
            handleOpenModal={handleOpenModal}
          />
        </div>
      </div>
    </div>
  );
};
export default BurgerIngredients;
