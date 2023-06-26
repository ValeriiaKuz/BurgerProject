import { wsReducer } from "./web-socket";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/constants-for-WS";

describe("web-socket reducer", () => {
  const initialState = {
    wsConnected: false,
    messages: {
      success: false,
      orders: [],
      total: 0,
      totalToday: 0,
    },
  };

  it("should return the initial state", () => {
    expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });
  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_ERROR,
        payload: Event,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: Event,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(initialState, {
        type: WS_GET_MESSAGE,
        payload: {
          success: true,
          orders: [1, 2, 3],
          total: 123,
          totalToday: 123,
        },
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      messages: {
        success: true,
        orders: [1, 2, 3],
        total: 123,
        totalToday: 123,
      },
    });
  });
});
