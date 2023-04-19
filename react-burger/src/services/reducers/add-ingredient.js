import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../actions/add-ingredient";

const initialState = {
  addedIngredients: [],
  orderPrice: 0,
};

//Тут происходит безумие, но ничего другого я не придумала
export const addIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const addedIngredients =
        action.payload.ingredient.type === "bun"
          ? state.addedIngredients.some((i) => i.type === "bun")
            ? state.addedIngredients.map((ing) =>
                ing.type === action.payload.ingredient.type
                  ? { ...action.payload.ingredient, id: action.payload.id }
                  : ing
              )
            : [
                ...state.addedIngredients,
                { ...action.payload.ingredient, id: action.payload.id },
              ]
          : [
              ...state.addedIngredients,
              { ...action.payload.ingredient, id: action.payload.id },
            ];
      const price =
        action.payload.ingredient.type === "bun"
          ? state.addedIngredients.some((i) => i.type === "bun")
            ? action.payload.ingredient.price * 2 -
              2 * state.addedIngredients.find((ing) => ing.type === "bun").price
            : action.payload.ingredient.price * 2
          : action.payload.ingredient.price;

      return {
        ...state,
        addedIngredients: addedIngredients,
        orderPrice: state.orderPrice + price,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        addedIngredients: [...state.addedIngredients].filter(
          (item) => item.id !== action.id
        ),
      };
    }

    default: {
      return state;
    }
  }
};
