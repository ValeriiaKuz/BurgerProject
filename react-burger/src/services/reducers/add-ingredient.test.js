import { addIngredientReducer } from "./add-ingredient";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../constants/constants";

describe("web-socket reducer", () => {
  const initialState = {
    addedIngredients: [],
  };

  it("should return the initial state", () => {
    expect(addIngredientReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle ADD_INGREDIENT with bun", () => {
    expect(
      addIngredientReducer(initialState, {
        type: ADD_INGREDIENT,
        payload: { ingredient: { type: "bun" }, id: 1 },
      })
    ).toEqual({
      addedIngredients: [
        { type: "bun", id: 1 },
        ...initialState.addedIngredients,
      ],
    });
  });

  it("should handle ADD_INGREDIENT without bun", () => {
    expect(
      addIngredientReducer(initialState, {
        type: ADD_INGREDIENT,
        payload: { ingredient: { type: "main" }, id: 3 },
      })
    ).toEqual({
      addedIngredients: [
        ...initialState.addedIngredients,
        { type: "main", id: 3 },
      ],
    });
  });

  it("should handle DELETE_INGREDIENT", () => {
    const ingredient1 = { type: "bun" };
    const ingredient2 = { type: "main" };
    const ingredient3 = { type: "sauce" };
    expect(
      addIngredientReducer(
        {
          addedIngredients: [
            { ...ingredient1, id: 1 },
            { ...ingredient2, id: 2 },
            { ...ingredient3, id: 3 },
          ],
        },
        {
          type: DELETE_INGREDIENT,
          id: 2,
        }
      )
    ).toEqual({
      addedIngredients: [
        { ...ingredient1, id: 1 },
        { ...ingredient3, id: 3 },
      ],
    });
  });

  it("should handle SORT_INGREDIENTS with bun", () => {
    const bun = { type: "bun", id: 2 };
    const ingredient1 = { type: "sauce", id: 1 };
    const ingredient2 = { type: "main", id: 3 };

    expect(
      addIngredientReducer(initialState, {
        type: SORT_INGREDIENTS,
        bun,
        ingredients: [ingredient1, ingredient2],
      })
    ).toEqual({
      addedIngredients: [
        { ...bun, id: 2 },
        { ...ingredient1, id: 1 },
        { ...ingredient2, id: 3 },
      ],
    });
  });

  it("should handle SORT_INGREDIENTS without bun", () => {
    const ingredient1 = { id: 1, type: "main" };
    const ingredient2 = { id: 2, type: "sauce" };

    expect(
      addIngredientReducer(initialState, {
        type: SORT_INGREDIENTS,
        bun: null,
        ingredients: [ingredient1, ingredient2],
      })
    ).toEqual({
      addedIngredients: [
        { ...ingredient1, id: 1 },
        { ...ingredient2, id: 2 },
      ],
    });
  });
});
