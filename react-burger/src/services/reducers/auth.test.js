import {
  GET_USER_DATA,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  PROFILE_INFO_CHANGED_FAILED,
  PROFILE_INFO_CHANGED_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  SEND_EMAIL,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_SUCCESS,
  SEND_LOGIN,
  SEND_LOGOUT,
  SEND_NEW_PROFILE_INFO,
  SEND_REGISTER,
  SEND_RESET_PASSWORD,
  SEND_RESET_PASSWORD_FAILED,
  SEND_RESET_PASSWORD_SUCCESS,
} from "../constants/constants";
import { authReducer } from "./auth";

describe("auth reducer", () => {
  const initialState = {
    isUser: false,
    isLoadingRegister: false,
    isErrorRegister: false,
    isLoadingLogin: false,
    isErrorLogin: false,
    isLoadingLogout: false,
    isErrorLogout: false,
    isLoadingUser: false,
    isErrorUser: false,
    isLoadingNewProfileInfo: false,
    isErrorNewProfileInfo: false,
    isLoadingEmail: false,
    emailSendSuccess: false,
    isLoadingReset: false,
    resetSuccess: false,
    user: { email: null, name: null },
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle SEND_REGISTER", () => {
    expect(
      authReducer(initialState, {
        type: SEND_REGISTER,
      })
    ).toEqual({
      ...initialState,
      isLoadingRegister: true,
      isErrorRegister: false,
    });
  });
  it("should handle REGISTER_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_SUCCESS,
        user: { email: "123@yandex.ru", name: "123" },
      })
    ).toEqual({
      ...initialState,
      user: { email: "123@yandex.ru", name: "123" },
      isLoadingRegister: false,
      isUser: true,
    });
  });
  it("should handle REGISTER_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_FAILED,
      })
    ).toEqual({
      ...initialState,
      isErrorRegister: true,
      isLoadingRegister: false,
    });
  });
  it("should handle SEND_LOGIN", () => {
    expect(
      authReducer(initialState, {
        type: SEND_LOGIN,
      })
    ).toEqual({
      ...initialState,
      isLoadingLogin: true,
      isErrorLogin: false,
    });
  });
  it("should handle LOGIN_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_SUCCESS,
        user: { email: "123@yandex.ru", name: "123" },
      })
    ).toEqual({
      ...initialState,
      user: { email: "123@yandex.ru", name: "123" },
      isLoadingLogin: false,
      isUser: true,
    });
  });
  it("should handle LOGIN_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      isErrorLogin: true,
      isLoadingLogin: false,
    });
  });
  it("should handle SEND_LOGOUT", () => {
    expect(
      authReducer(initialState, {
        type: SEND_LOGOUT,
      })
    ).toEqual({
      ...initialState,
      isLoadingLogout: true,
      isErrorLogout: false,
    });
  });
  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_SUCCESS,
        user: { email: null, name: null },
      })
    ).toEqual({
      ...initialState,
      user: { email: null, name: null },
      isLoadingLogout: false,
      isUser: false,
    });
  });
  it("should handle LOGOUT_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual({
      ...initialState,
      isErrorLogout: true,
      isLoadingLogout: false,
    });
  });
  it("should handle GET_USER_DATA", () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_DATA,
      })
    ).toEqual({
      ...initialState,
      isLoadingUser: true,
      isErrorUser: false,
    });
  });
  it("should handle GET_USER_DATA_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_DATA_SUCCESS,
        user: { email: "123@yandex.ru", name: "123" },
      })
    ).toEqual({
      ...initialState,
      user: { email: "123@yandex.ru", name: "123" },
      isLoadingUser: false,
      isUser: true,
    });
  });
  it("should handle GET_USER_DATA_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_DATA_FAILED,
      })
    ).toEqual({
      ...initialState,
      isErrorUser: true,
      isLoadingUser: false,
    });
  });
  it("should handle SEND_NEW_PROFILE_INFO", () => {
    expect(
      authReducer(initialState, {
        type: SEND_NEW_PROFILE_INFO,
      })
    ).toEqual({
      ...initialState,
      isLoadingNewProfileInfo: true,
    });
  });
  it("should handle PROFILE_INFO_CHANGED_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: PROFILE_INFO_CHANGED_SUCCESS,
        user: { email: "123@yandex.ru", name: "123" },
      })
    ).toEqual({
      ...initialState,
      user: { email: "123@yandex.ru", name: "123" },
      isLoadingNewProfileInfo: false,
      isUser: true,
    });
  });
  it("should handle PROFILE_INFO_CHANGED_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: PROFILE_INFO_CHANGED_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoadingNewProfileInfo: false,
      isErrorNewProfileInfo: true,
    });
  });
  it("should handle SEND_EMAIL", () => {
    expect(
      authReducer(initialState, {
        type: SEND_EMAIL,
      })
    ).toEqual({
      ...initialState,
      isLoadingEmail: true,
    });
  });
  it("should handle SEND_EMAIL_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: SEND_EMAIL_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLoadingEmail: false,
      emailSendSuccess: true,
    });
  });
  it("should handle SEND_EMAIL_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: SEND_EMAIL_FAILED,
      })
    ).toEqual({
      ...initialState,
      emailSendSuccess: false,
      isLoadingEmail: false,
    });
  });
  it("should handle SEND_RESET_PASSWORD", () => {
    expect(
      authReducer(initialState, {
        type: SEND_RESET_PASSWORD,
      })
    ).toEqual({
      ...initialState,
      isLoadingReset: true,
    });
  });
  it("should handle SEND_RESET_PASSWORD_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: SEND_RESET_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLoadingReset: false,
      resetSuccess: true,
    });
  });
  it("should handle SEND_RESET_PASSWORD_FAILED", () => {
    expect(
      authReducer(initialState, {
        type: SEND_RESET_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoadingReset: false,
      resetSuccess: false,
    });
  });
});
