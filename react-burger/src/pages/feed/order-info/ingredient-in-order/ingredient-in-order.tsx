import { useSelector } from "../../../../utils/hooks/hooks";
import { FC } from "react";
import style from "./ingredient-in-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
type IngredientInOrderProps = {
  ingredientId: string;
  count: number;
};
export const IngredientInOrder: FC<IngredientInOrderProps> = ({
  ingredientId,
  count,
}) => {
  const ingredients = useSelector((state) => state.ingredients.ingredientsData);
  const foundIngredient = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );
  if (foundIngredient && foundIngredient.type === "bun") {
    count = count * 2;
  }
  return foundIngredient ? (
    <div className={style.ingredientWrapper}>
      <div className={style.imgName}>
        <div className={style.imgWrapper}>
          <img src={foundIngredient.image_mobile} className={style.img} alt={'ingredient'}/>
        </div>
        <span className="text text_type_main-default">
          {foundIngredient.name}
        </span>
      </div>
      <div className={style.count}>
        <span className="text text_type_digits-default">
          {`${count} x ${foundIngredient.price}`}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  ) : null;
};
