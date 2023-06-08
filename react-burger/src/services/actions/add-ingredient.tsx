import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../constants/constants";
import {
  TIngredient,
  TIngredientWithID,
} from "../../utils/types/ingredient-types";
export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  payload: { id: string; ingredient: TIngredient };
};
export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: string;
};
export type TSortIngredientAction = {
  readonly type: typeof SORT_INGREDIENTS;
  readonly bun: TIngredientWithID | null;
  readonly ingredients: Array<TIngredientWithID>;
};

export type TIngredientActions =
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TSortIngredientAction;
export const addIngredientAC = (
  ingredient: TIngredient
): TAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      id: crypto.randomUUID(),
      ingredient: ingredient,
    },
  };
};
