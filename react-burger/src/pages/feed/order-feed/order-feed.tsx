import { useSelector } from "../../../utils/hooks/hooks";
import { OrderCard } from "./order-card/order-card";
import style from "./order-feed.module.css";
import { FC } from "react";
export type OrderFeedStatus = {
  withStatus: boolean;
};
export const OrderFeed: FC<OrderFeedStatus> = ({ withStatus }) => {
  const orders = useSelector((state) => state.orders.messages.orders);
  if (withStatus && orders && orders[0]?.createdAt < orders[1]?.createdAt) {
    orders.reverse();
  }
  return orders ? (
    <section>
      <div className={style.wrapper}>
        <div className={`${style.orders} ${style.customScroll} `}>
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} withStatus={withStatus} />
          ))}
        </div>
      </div>
    </section>
  ) : (
    <>Загрузка данных</>
  );
};
