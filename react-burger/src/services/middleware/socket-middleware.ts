import { Middleware, MiddlewareAPI } from "redux";
import { AppActions, AppDispatch, RootState } from "../../utils/types";
import { TWSResponseFeed } from "../../utils/types/ws-response";
import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === "WS_CONNECTION_START") {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === "WS_CONNECTION_START_WITH_TOKEN") {
        const token = getCookie("accessToken");
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TWSResponseFeed = JSON.parse(data);

          dispatch({ type: "WS_GET_MESSAGE", payload: parsedData });
        };
        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
          }
        };
        if (type === "WS_CONNECTION_CLOSED") {
          socket.close(1000);
        }
      }
      next(action);
    };
  }) as Middleware;
};
