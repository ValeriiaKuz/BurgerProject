import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";
import style from "./feed.module.css";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/constants/constants-for-WS";
import { OrderStatusBoard } from "./order-status-board/order-status-board";
import { OrderFeed } from "./order-feed/order-feed";

const Feed: FC = () => {
  const wasConnected = useSelector((state) => state.orders.wsConnected);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  return wasConnected ? (
    <div className={style.wrapper}>
      <h2 className="text text_type_main-large mt-5 mb-5">Лента заказов</h2>
      <div className={style.sectionWrapper}>
        <OrderFeed withStatus={false} />
        <OrderStatusBoard />
      </div>
    </div>
  ) : (
    <>Загрузка данных</>
  );
};
export default Feed;
