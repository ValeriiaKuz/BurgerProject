import { useDispatch, useSelector } from "../../../utils/hooks/hooks";
import { Params, useLocation, useParams } from "react-router-dom";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { TOrder } from "../../../utils/types/ws-response";
import style from "./order-info.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientInOrder } from "./ingredient-in-order/ingredient-in-order";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_WITH_TOKEN,
} from "../../../services/constants/constants-for-WS";
import { OrderStatus } from "../../../components/order/order-status";
import { OrderCost } from "../../../components/order/order-cost";
import { getCookie } from "../../../utils/cookie";
import { wsUrl } from "../../../utils/types";
export const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<TOrder | null>(null);
  const orders = useSelector((state) => state.orders.messages.orders);
  const ingredients = useSelector((state) => state.ingredients.ingredientsData);
  const onCreateConnection = useCallback(() => {
    if (orders.length < 1 && location.pathname.startsWith("/profile")) {
      const token = getCookie("accessToken");
      dispatch({
        type: WS_CONNECTION_START_WITH_TOKEN,
        url: `${wsUrl}?token=${token}`,
      });
    }
    if (orders.length < 1 && location.pathname.startsWith("/feed")) {
      dispatch({ type: WS_CONNECTION_START, url: `${wsUrl}/all` });
    }
  }, [dispatch, location.pathname, orders.length]);

  let { id }: Readonly<Params> = useParams<string>();
  useEffect(() => {
    const foundOrder = orders.find((i: TOrder) => i._id === id);
    setOrder(foundOrder || null);
    onCreateConnection();
  }, [id, orders, onCreateConnection]);
  const foundIngredients = useMemo(() => {
    if (order) {
      return order.ingredients.map((id) =>
        ingredients.find((ingredient) => ingredient._id === id)
      );
    }
  }, [ingredients, order?.ingredients]);

  const uniqueIngredients = useMemo(() => {
    if (!order) {
      return [];
    }
    return order.ingredients.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }, [order]);
  return order ? (
    <div className={style.orderWrapper}>
      <div className={style.orderNumber}>
        <span className="text text_type_digits-default">#{order.number}</span>
      </div>
      <div className={style.orderName}>
        <span className="text text_type_main-medium ">{order.name}</span>
        <span className="text text_type_main-small">
          <OrderStatus order={order} />
        </span>
      </div>
      <div className={style.ingredientCardsTitle}>
        <span className="text text_type_main-medium">Состав:</span>
        <div className={`${style.ingredientCards} ${style.customScroll} `}>
          {uniqueIngredients.map((ingredientID, index) => {
            const count = order.ingredients.reduce((acc, curr) => {
              return curr === ingredientID ? acc + 1 : acc;
            }, 0);
            return (
              <IngredientInOrder
                foundIngredients={foundIngredients!}
                ingredientId={ingredientID}
                count={count}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className={style.dateAndCost}>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </div>
        <OrderCost foundIngredients={foundIngredients!} />
      </div>
    </div>
  ) : null;
};
