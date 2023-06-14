import { TIngredientsActions } from "../actions/get-ingredients";
import {
  GET_INGREDIENTS_DATA,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS,
} from "../constants/constants";
import { TIngredient } from "../../utils/types/ingredient-types";
export type TIngredientsState = {
  ingredientsData: ReadonlyArray<TIngredient>;
  isLoading: boolean;
  isError: boolean;
};
const initialState: TIngredientsState = {
  isLoading: false,
  isError: false,
  ingredientsData: [],
};
export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_DATA: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case GET_INGREDIENTS_DATA_SUCCESS: {
      return {
        ...state,
        ingredientsData: action.ingredientsData,
        isLoading: false,
      };
    }
    case GET_INGREDIENTS_DATA_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
