import { sendOrderRequest } from "../../utils/API";
import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
} from "../constants/constants";
import { AppDispatch, AppThunkAction } from "../../utils/types";
export type TGetOrderNumberAction = {
  readonly type: typeof GET_ORDER_NUMBER;
};
export type TGetOrderNumberFailedAction = {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
};
export type TGetOrderNumberSuccessAction = {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: number;
};
export type TOrderNumberActions =
  | TGetOrderNumberAction
  | TGetOrderNumberFailedAction
  | TGetOrderNumberSuccessAction;
export const getOrderNumber = (idArray: Array<string>): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_NUMBER,
    });
    sendOrderRequest(idArray)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      });
  };
};
