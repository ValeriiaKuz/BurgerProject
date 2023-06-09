import style from "../burger-ingredients.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { TabType } from "../burger-ingredients";
import { TIngredient } from "../../../utils/types/ingredient-types";
import { FC } from "react";
type TypeOfIngredients = {
  header: TabType;
  ingredients: Array<TIngredient>;
};
const TypeOfIngredients: FC<TypeOfIngredients> = ({ header, ingredients }) => {
  return (
    <div>
      <h2 className="mt-10 mb-6">{header}</h2>
      <div className={style.cards}>
        {ingredients.map((ingredient: TIngredient, index) => {
          return (
            <div data-testid={`card-${index}-${header}`} key={ingredient._id}>
              <IngredientCard draggable ingredient={ingredient} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypeOfIngredients;
