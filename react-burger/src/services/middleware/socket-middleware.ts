import { Middleware, MiddlewareAPI } from "redux";
import { AppActions, AppDispatch, RootState } from "../../utils/types";
import { TWSResponseFeed } from "../../utils/types/ws-response";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_START_WITH_TOKEN,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/constants-for-WS";
import { getCookie } from "../../utils/cookie";
import { refreshToken as refreshTokenRequest } from "../../utils/API";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === WS_CONNECTION_START_WITH_TOKEN) {
        socket = new WebSocket(`${wsUrl}?token=${action.token}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TWSResponseFeed = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            const refreshToken = getCookie("refreshToken");

            if (refreshToken) {
              refreshTokenRequest(refreshToken).then(() => {
                const token = getCookie("accessToken");
                socket = new WebSocket(`${wsUrl}?token=${token}`);
              });
            }
          }

          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };
        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
          }
        };
        if (type === WS_CONNECTION_CLOSED) {
          socket.close(1000);
        }
      }
      next(action);
    };
  }) as Middleware;
};
