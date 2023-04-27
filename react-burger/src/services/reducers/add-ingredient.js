import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../actions/add-ingredient";

const initialState = {
  addedIngredients: [],
  orderPrice: 0,
};
// Код не стал короче, но вроде бы стал более читабельный. Танцы с бубном по добавлению булок в начало, а то у меня ломается сортировка. Другого решения не смогла придумать:(
export const addIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const { ingredient, id } = action.payload;

      let addedIngredients;
      if (ingredient.type === "bun") {
        if (state.addedIngredients.some((i) => i.type === "bun")) {
          addedIngredients = state.addedIngredients.map((ing) =>
            ing.type === ingredient.type ? { ...ingredient, id: id } : ing
          );
        } else {
          addedIngredients = [
            { ...ingredient, id: id },
            ...state.addedIngredients,
          ];
        }
      } else {
        addedIngredients = [
          ...state.addedIngredients,
          { ...ingredient, id: id },
        ];
      }

      let price;
      if (ingredient.type === "bun") {
        if (state.addedIngredients.some((i) => i.type === "bun")) {
          price =
            ingredient.price * 2 -
            2 * state.addedIngredients.find((ing) => ing.type === "bun").price;
        } else {
          price = ingredient.price * 2;
        }
      } else {
        price = ingredient.price;
      }

      return {
        ...state,
        addedIngredients: addedIngredients,
        orderPrice: state.orderPrice + price,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        addedIngredients: state.addedIngredients.filter(
          (item) => item.id !== action.id
        ),
        orderPrice: state.orderPrice - action.price,
      };
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        addedIngredients: action.bun
          ? [action.bun, ...action.ingredients]
          : [...action.ingredients],
      };
    }
    default: {
      return state;
    }
  }
};
