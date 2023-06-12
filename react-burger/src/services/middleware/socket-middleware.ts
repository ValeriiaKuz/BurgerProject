import { Middleware, MiddlewareAPI } from "redux";
import {
  AppActions,
  AppDispatch,
  RootState,
  TWSStoreActions,
  TWSStoreActionsWithToken,
  wsUrl,
} from "../../utils/types";
import { TWSResponseFeed } from "../../utils/types/ws-response";
import { getCookie } from "../../utils/cookie";
import { refreshToken as refreshTokenRequest } from "../../utils/API";
import { WS_CONNECTION_START_WITH_TOKEN } from "../constants/constants-for-WS";

export const socketMiddleware = (
  wsActions: TWSStoreActions | TWSStoreActionsWithToken
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(action.url);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TWSResponseFeed = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            const refreshToken = getCookie("refreshToken");

            if (refreshToken) {
              refreshTokenRequest(refreshToken).then(() => {
                const token = getCookie("accessToken");
                dispatch({
                  type: WS_CONNECTION_START_WITH_TOKEN,
                  url: `${wsUrl}?token=${token}`,
                });
              });
            }
          }

          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch({ type: onError, payload: event });
          }
        };
        if (type === onClose) {
          socket.close(1000);
        }
      }
      next(action);
    };
  }) as Middleware;
};
