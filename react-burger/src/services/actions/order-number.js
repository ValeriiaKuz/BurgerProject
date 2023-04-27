import { sendOrderRequest } from "../../utils/API";

export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const getOrderNumber = (idArray) => {
  return function (dispatch) {
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
