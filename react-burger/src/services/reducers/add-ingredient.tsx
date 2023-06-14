import { TIngredientActions } from "../actions/add-ingredient";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../constants/constants";
import { TIngredientWithID } from "../../utils/types/ingredient-types";
export type TAddedIngredientsState = {
  addedIngredients: Array<TIngredientWithID>;
};
const initialState: TAddedIngredientsState = {
  addedIngredients: [],
};
export const addIngredientReducer = (
  state = initialState,
  action: TIngredientActions
): TAddedIngredientsState => {
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

      return {
        ...state,
        addedIngredients: addedIngredients,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        addedIngredients: state.addedIngredients.filter(
          (item) => item.id !== action.id
        ),
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
