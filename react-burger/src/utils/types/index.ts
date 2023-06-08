import { store } from "../../index";
import { TIngredientActions } from "../../services/actions/add-ingredient";
import { TIngredientsActions } from "../../services/actions/get-ingredients";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TOrderNumberActions } from "../../services/actions/order-number";
import { TAuthActions } from "./auth-types";
import { TWSActions } from "../../services/actions/WSActions";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../../services/constants/constants-for-WS";

type TApplicationActions =
  | TIngredientActions
  | TIngredientsActions
  | TOrderNumberActions
  | TAuthActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions | AppActions
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
export type AppActions = TWSActions;
export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
};
export const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
export const wsUrl: string = "wss://norma.nomoreparties.space/orders";
