export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";

export const addIngredientAC = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      id: crypto.randomUUID(),
      ingredient: ingredient,
    },
  };
};
