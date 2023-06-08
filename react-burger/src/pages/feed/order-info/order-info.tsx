import { useDispatch, useSelector } from "../../../utils/hooks/hooks";
import { Params, useLocation, useParams } from "react-router-dom";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Status, TOrder } from "../../../utils/types/ws-response";
import style from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientInOrder } from "./ingredient-in-order/ingredient-in-order";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_WITH_TOKEN,
} from "../../../services/constants/constants-for-WS";
export const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<TOrder | null>(null);
  const orders = useSelector((state) => state.orders.messages.orders);
  const onCreateConnection = useCallback(() => {
    if (orders.length < 1 && location.pathname.startsWith("/profile")) {
      dispatch({ type: WS_CONNECTION_START_WITH_TOKEN });
    }
    if (orders.length < 1 && location.pathname.startsWith("/feed")) {
      dispatch({ type: WS_CONNECTION_START });
    }
  }, [dispatch, location.pathname, orders.length]);
  useEffect(() => {
    onCreateConnection();
  }, [onCreateConnection]);
  let { id }: Readonly<Params> = useParams<string>();
  useEffect(() => {
    const foundOrder: TOrder | undefined = orders.find(
      (i: TOrder) => i._id === id
    );
    setOrder(foundOrder || null);
  }, [id, orders]);
  const ingredients = useSelector((state) => state.ingredients.ingredientsData);
  let totalCost = 0;
  order?.ingredients.forEach((id) => {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );
    if (foundIngredient) {
      totalCost += foundIngredient.price;
      if (foundIngredient.type === "bun") {
        totalCost += foundIngredient.price;
      }
    }
  });
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
          {order.status === Status.done ? (
            <div className={style.done}>Выполнен</div>
          ) : order.status === Status.pending ? (
            <div>Готовится</div>
          ) : (
            <div>Создан</div>
          )}
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
        <div className={style.cost}>
          <span className="text text_type_digits-default">{totalCost}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
};
