import { TOrder } from "../../utils/types/ws-response";
import { TWSActions } from "../actions/WSActions";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/constants-for-WS";

type TWSState = {
  wsConnected: boolean;
  messages: {
    success: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = (
  state = initialState,
  action: TWSActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: {
          success: action.payload.success,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };

    default:
      return state;
  }
};
