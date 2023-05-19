import React, { useEffect, useState } from "react";
import style from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const [ingredient, setIngredient] = useState({});
  const ingredientsData = useSelector(
    (store) => store.ingredients.ingredientsData
  );
  let { id } = useParams();
  useEffect(() => {
    const foundIngredient = ingredientsData.find((i) => i._id === id);
    setIngredient(foundIngredient || {});
  }, [id, ingredientsData]);
  return (
    <div className={`ml-30 mr-30 mb-15 ${style.contentWrapper}`}>
      <img
        src={ingredient.image_large}
        alt={"ингредиент"}
        className="mt-4 mb-4"
      />
      <h3 className="text text_type_main-medium mb-8">{ingredient.name}</h3>
      <div className="text text_type_main-default text_color_inactive">
        <ul className={style.nutrition}>
          <li>
            <span> Калории,ккал </span>
            {ingredient.calories}
          </li>
          <li>
            <span> Белки, г</span>
            {ingredient.proteins}
          </li>
          <li>
            <span> Жиры, г</span>
            {ingredient.fat}
          </li>
          <li>
            <span> Углеводы, г </span>
            {ingredient.carbohydrates}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
