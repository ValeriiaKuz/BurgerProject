import { ImgLine } from "../../pages/feed/order-feed/order-card/img-line/img-line";
import style from "../../pages/feed/order-feed/order-card/order-card.module.css";
import { TIngredient } from "../../utils/types/ingredient-types";
import { FC } from "react";
type OrderImgsProps = {
  foundIngredients: Array<TIngredient | undefined>;
};
export const OrderImgs: FC<OrderImgsProps> = ({ foundIngredients }) => {
  const foundIngredientsImg = Array.from(
    new Set(foundIngredients.map((ingredient) => ingredient?.image_mobile))
  );
  return (
    <div className={style.imgsWrapper}>
      {foundIngredientsImg.slice(0, 6).map((img, index) => {
        return (
          <ImgLine
            img={img!}
            index={index}
            length={foundIngredientsImg.length}
            key={index}
          />
        );
      })}
    </div>
  );
};
