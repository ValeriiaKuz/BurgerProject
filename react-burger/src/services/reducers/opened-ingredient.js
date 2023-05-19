import {
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT,
} from "../actions/opened-ingredient";

const initialState = {
  // openedIngredient: null,
  isOpenModal: false,
};

export const openedIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT: {
      return {
        // openedIngredient: action.ingredient,
        isOpenModal: true,
      };
    }
    case CLOSE_INGREDIENT: {
      return {
        // openedIngredient: null,
        isOpenModal: false,
      };
    }
    default:
      return state;
  }
};
