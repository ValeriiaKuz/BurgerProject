import { Status, TOrder } from "../../../../utils/types/ws-response";
import { FC, useMemo } from "react";
import { useSelector } from "../../../../utils/hooks/hooks";
import style from "./order-card.module.css";
import {
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ImgLine } from "./img-line/img-line";
import { NavLink, useLocation } from "react-router-dom";
import { OrderFeedStatus } from "../order-feed";
import { OrderCost } from "../../../../components/order/order-cost";
type OrderType = {
  order: TOrder;
} & OrderFeedStatus;
export const OrderCard: FC<OrderType> = ({ order, withStatus }) => {
  const ingredients = useSelector((state) => state.ingredients.ingredientsData);
  let ingredientImg: string[] = [];

  const foundIngredients = useMemo(() => {
    return order.ingredients.map((id) =>
      ingredients.find((ingredient) => ingredient._id === id)
    );
  }, [ingredients, order.ingredients]);

  order.ingredients.forEach((id) => {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );
    if (foundIngredient) {
      ingredientImg = [...ingredientImg, foundIngredient.image_mobile];
    }
  });

  let location = useLocation();
  return (
    <NavLink
      to={`${location.pathname}/${order._id}`}
      state={{ background: location }}
      className={style.link}
    >
      <div className={style.wrapper}>
        <div className={style.orderNumber}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </span>
        </div>
        <div className={style.nameAndStatus}>
          <span className="text text_type_main-medium mb-2">{order.name}</span>
          {withStatus && order.status === Status.done ? (
            <div className={style.done}>Выполнен</div>
          ) : withStatus && order.status === Status.pending ? (
            <div>Готовится</div>
          ) : withStatus && order.status === Status.done ? (
            <div>Создан</div>
          ) : null}
        </div>
        <div className={style.imgCostWrapper}>
          <div className={style.imgsWrapper}>
            {ingredientImg.slice(0, 6).map((img, index) => {
              return (
                <ImgLine
                  img={img}
                  index={index}
                  length={ingredientImg.length}
                  key={index}
                />
              );
            })}
          </div>
          <OrderCost foundIngredients={foundIngredients} />
        </div>
      </div>
    </NavLink>
  );
};
