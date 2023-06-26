import { ingredientsReducer } from "./get-ingredients";
import * as types from "../constants/constants";

describe("get-ingredients reducer", () => {
  const initialState = {
    isLoading: false,
    isError: false,
    ingredientsData: [],
  };
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle GET_INGREDIENTS_DATA", () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_DATA,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });
  it("should handle GET_INGREDIENTS_DATA_SUCCESS", () => {
    expect(
      ingredientsReducer(
        { isLoading: true, ...initialState },
        {
          type: types.GET_INGREDIENTS_DATA_SUCCESS,
          ingredientsData: [1, 2, 3],
        }
      )
    ).toEqual({
      isLoading: false,
      isError: false,
      ingredientsData: [1, 2, 3],
    });
  });
  it("should handle GET_INGREDIENTS_DATA_FAILED", () => {
    expect(
      ingredientsReducer(
        { isLoading: true, ...initialState },
        {
          type: types.GET_INGREDIENTS_DATA_FAILED,
        }
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
