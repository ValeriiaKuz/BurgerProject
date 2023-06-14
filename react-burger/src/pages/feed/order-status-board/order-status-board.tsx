import style from "../feed.module.css";
import { useSelector } from "../../../utils/hooks/hooks";
import { useMemo } from "react";
import { Status } from "../../../utils/types/ws-response";

export const OrderStatusBoard = () => {
  const total = useSelector((state) => state.orders.messages.total);
  const totalToday = useSelector((state) => state.orders.messages.totalToday);
  const orders = useSelector((state) => state.orders.messages.orders);

  const doneOrdersNumber = useMemo(() => {
    return orders
      .filter((order) => order.status === Status.done)
      .map((order) => order.number);
  }, [orders]);
  const notDoneOrdersNumber = useMemo(() => {
    return orders
      .filter((order) => order.status !== Status.done)
      .map((order) => order.number);
  }, [orders]);
  return (
    <section className={style.orderBoard}>
      <div className={style.orderStatus}>
        <div className={style.doneOrdersWrapper}>
          <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
          <div className={`${style.doneOrders} ${style.customScroll}`}>
            {doneOrdersNumber.map((number, index) => (
              <span
                className={`text text_type_digits-default ${style.number}`}
                key={index}
              >
                {number}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text text_type_main-medium pb-6">В работе:</h3>
          <div className={`${style.doneOrders} ${style.customScroll}`}>
            {notDoneOrdersNumber.map((number, index) => (
              <span
                className={`text text_type_digits-default ${style.number}`}
                key={index}
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <span className={`text text_type_digits-large ${style.glow}`}>
          {total}
        </span>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span className={`text text_type_digits-large ${style.glow}`}>
          {totalToday}
        </span>
      </div>
    </section>
  );
};
