import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../../utils/hooks/hooks";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START_WITH_TOKEN,
} from "../../../services/constants/constants-for-WS";
import { OrderFeed } from "../../feed/order-feed/order-feed";
import { getCookie } from "../../../utils/cookie";

export const ProfileOrders: FC = () => {
  const wasConnected = useSelector((state) => state.orders.wsConnected);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookie("accessToken");
    dispatch({ type: WS_CONNECTION_START_WITH_TOKEN, token: token! });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  return wasConnected ? (
    <OrderFeed withStatus={true} />
  ) : (
    <span>Загрузка данных</span>
  );
};
