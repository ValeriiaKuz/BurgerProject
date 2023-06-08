import { sendGetIngredientsRequest } from "../../utils/API";
import {
  GET_INGREDIENTS_DATA,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS,
} from "../constants/constants";
import { AppDispatch, AppThunkAction } from "../../utils/types";
import { TIngredient } from "../../utils/types/ingredient-types";
export type TGetIngredientsAction = {
  readonly type: typeof GET_INGREDIENTS_DATA;
};
export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_DATA_FAILED;
};
export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_DATA_SUCCESS;
  ingredientsData: ReadonlyArray<TIngredient>;
};
export type TIngredientsActions =
  | TGetIngredientsAction
  | TGetIngredientsFailedAction
  | TGetIngredientsSuccessAction;
export const getIngredientsData = (): AppThunkAction => {
  return function (dispatch: AppDispatch) {
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
