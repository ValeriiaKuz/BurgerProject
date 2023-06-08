import { FC } from "react";
import style from "./ingredient-in-order.module.css";
import { TIngredient } from "../../../../utils/types/ingredient-types";
import { OrderCost } from "../../../../components/order/order-cost";
type IngredientInOrderProps = {
  foundIngredients: Array<TIngredient | undefined>;
  ingredientId: string;
  count: number;
};
export const IngredientInOrder: FC<IngredientInOrderProps> = ({
  ingredientId,
  count,
  foundIngredients,
}) => {
  const foundIngredient = foundIngredients.find(
    (ingredient) => ingredient!._id === ingredientId
  );
  if (foundIngredient && foundIngredient.type === "bun") {
    count = count * 2;
  }
  return foundIngredient ? (
    <div className={style.ingredientWrapper}>
      <div className={style.imgName}>
        <div className={style.imgWrapper}>
          <img
            src={foundIngredient.image_mobile}
            className={style.img}
            alt={"ingredient"}
          />
        </div>
        <span className="text text_type_main-default">
          {foundIngredient.name}
        </span>
      </div>
      <OrderCost foundIngredients={[foundIngredient]} count={count} />
    </div>
  ) : null;
};
