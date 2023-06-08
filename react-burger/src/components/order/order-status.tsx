import { Status, TOrder } from "../../utils/types/ws-response";
import style from "../../pages/feed/order-feed/order-card/order-card.module.css";
import { FC } from "react";

type OrderStatusProps = {
  order: TOrder;
};
export const OrderStatus: FC<OrderStatusProps> = ({ order }) => {
  return order.status === Status.done ? (
    <div className={style.done}>Выполнен</div>
  ) : order.status === Status.pending ? (
    <div>Готовится</div>
  ) : order.status === Status.created ? (
    <div>Создан</div>
  ) : null;
};
