import {
  GET_INGREDIENTS_DATA,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS,
} from "../actions/get-ingredients";

const initialState = {
  isLoading: false,
  isError: false,
  ingredientsData: [],
};
export const ingredientsReducer = (state = initialState, action) => {
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
