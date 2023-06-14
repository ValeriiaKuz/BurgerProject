import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
} from "../constants/constants";
import { TOrderNumberActions } from "../actions/order-number";
export type TOrderNumberState = {
  isLoading: boolean;
  isError: boolean;
  orderNumber: number | null;
};
const initialState: TOrderNumberState = {
  isLoading: false,
  isError: false,
  orderNumber: null,
};
export const orderNumberReducer = (
  state = initialState,
  action: TOrderNumberActions
): TOrderNumberState => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        isLoading: false,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
