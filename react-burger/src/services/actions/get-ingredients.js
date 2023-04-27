import { sendGetIngredientsRequest } from "../../utils/API";

export const GET_INGREDIENTS_DATA = "GET_INGREDIENTS_DATA";
export const GET_INGREDIENTS_DATA_FAILED = "GET_INGREDIENTS_DATA_FAILED";
export const GET_INGREDIENTS_DATA_SUCCESS = "GET_INGREDIENTS_DATA_SUCCESS";

export const getIngredientsData = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_DATA,
    });
    sendGetIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_DATA_SUCCESS,
            ingredientsData: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: GET_INGREDIENTS_DATA_FAILED,
        });
      });
  };
};
