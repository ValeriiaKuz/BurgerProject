import { ADD_BUN, ADD_INGREDIENT } from "../actions/add-ingredient";

const initialState = {
  addedIngredients: [],
  bunAdded: false,
  orderPrice: 0,
};
export const addIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const price =
        action.addedIngredient.type === "bun"
          ? action.addedIngredient.price * 2
          : action.addedIngredient.price;
      return {
        ...state,
        addedIngredients: [...state.addedIngredients, action.addedIngredient],
        orderPrice: state.orderPrice + price,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bunAdded: true,
      };
    }
    default: {
      return state;
    }
  }
};
