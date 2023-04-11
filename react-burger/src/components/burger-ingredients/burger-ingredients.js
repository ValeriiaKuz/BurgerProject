import style from "./burger-ingredients.module.css";
import React, { useContext, useEffect, useState } from "react";
import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import PropTypes from "prop-types";
import TypeOfIngredients from "./type-of-ingredients/type-of-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { IngredientsContext } from "../../services/ingredients-context";

const BurgerIngredients = ({ getAddedIngredients, orderPriceDispatcher }) => {
  const { ingredientsData } = useContext(IngredientsContext);
  const [addedIngredient, getAddedIngredient] = useState([]);
  const [tabId, getTabId] = useState("Булки");
  const [bunAdded, setBunAdded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openedIngredient, setOpenedIngredient] = useState({});

  useEffect(() => {
    getAddedIngredients(addedIngredient);
  }, [addedIngredient]);
  useEffect(() => {
    document
      .getElementById(tabId)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [tabId]);
  const getElementByType = (type, ingredientsData) => {
    return ingredientsData.map((ingredient) => {
      if (ingredient.type === type) {
        return (
          <IngredientCard
            key={ingredient._id}
            ingredient={ingredient}
            addedIngredient={addedIngredient}
            getAddedIngredient={getAddedIngredient}
            bunAdded={bunAdded}
            setBunAdded={setBunAdded}
            handleOpenModal={handleOpenModal}
            orderPriceDispatcher={orderPriceDispatcher}
          />
        );
      }
    });
  };
  const handleOpenModal = (ingredient) => {
    setIsOpenModal(true);
    setOpenedIngredient(ingredient);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
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
BurgerIngredients.propTypes = {
  getAddedIngredients: PropTypes.func.isRequired,
  orderPriceDispatcher: PropTypes.func.isRequired,
};
export default BurgerIngredients;
