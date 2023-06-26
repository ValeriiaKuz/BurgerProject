import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from "../constants/constants";
import { orderNumberReducer } from "./order-number";

describe("order-number reducer", () => {
  const initialState = {
    isLoading: false,
    isError: false,
    orderNumber: null,
  };

  it("should return the initial state", () => {
    expect(orderNumberReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle GET_ORDER_NUMBER", () => {
    expect(
      orderNumberReducer(initialState, {
        type: GET_ORDER_NUMBER,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  it("should handle GET_ORDER_NUMBER_SUCCESS", () => {
    expect(
      orderNumberReducer(
        { isLoading: true, ...initialState },
        {
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: 123,
        }
      )
    ).toEqual({
      isLoading: false,
      isError: false,
      orderNumber: 123,
    });
  });

  it("should handle GET_ORDER_NUMBER_FAILED", () => {
    expect(
      orderNumberReducer(initialState, {
        type: GET_ORDER_NUMBER_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
