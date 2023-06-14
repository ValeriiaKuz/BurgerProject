import { TOrder } from "../../../../utils/types/ws-response";
import { FC, useMemo } from "react";
import { useSelector } from "../../../../utils/hooks/hooks";
import style from "./order-card.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import { OrderFeedStatus } from "../order-feed";
import { OrderCost } from "../../../../components/order/order-cost";
import { OrderStatus } from "../../../../components/order/order-status";
import { OrderImgs } from "../../../../components/order/order-imgs";
type OrderType = {
  order: TOrder;
} & OrderFeedStatus;
export const OrderCard: FC<OrderType> = ({ order, withStatus }) => {
  const ingredients = useSelector((state) => state.ingredients.ingredientsData);
  const foundIngredients = useMemo(() => {
    return order.ingredients.map((id) =>
      ingredients.find((ingredient) => ingredient._id === id)
    );
  }, [ingredients, order.ingredients]);

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
          {withStatus && <OrderStatus order={order} />}
        </div>
        <div className={style.imgCostWrapper}>
          <OrderImgs foundIngredients={foundIngredients} />
          <OrderCost foundIngredients={foundIngredients} />
        </div>
      </div>
    </NavLink>
  );
};
