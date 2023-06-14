import {
  getUserRequestWithAuth,
  sendEmailRequest,
  sendRegisterRequest,
  sendResetChangeProfileInfo,
  sendResetPasswordRequest,
  singInRequest,
  singOutRequest,
} from "../../utils/API";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { Navigate } from "react-router-dom";
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
import { AppDispatch, AppThunkAction } from "../../utils/types";
export type PassWordType = string;
export type EmailType = string;
export type NameType = string;
export const register = (
  valueEmail: EmailType,
  valuePassword: PassWordType,
  valueName: NameType
): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_REGISTER,
    });
    sendRegisterRequest(valueEmail, valuePassword, valueName)
      .then((res) => {
        let refreshToken = res.refreshToken;
        let accessToken =
          res.accessToken.indexOf("Bearer") === 0
            ? res.accessToken.split("Bearer ")[1]
            : null;
        if (accessToken) {
          setCookie("accessToken", accessToken, { path: "/" });
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken, { path: "/" });
        }
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            user: { email: res.user.email, name: res.user.name },
          });
        } else {
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
};

export const singIn = (
  valueEmail: EmailType,
  valuePassword: PassWordType
): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_LOGIN,
    });
    singInRequest(valueEmail, valuePassword)
      .then((res) => {
        let refreshToken = res.refreshToken;
        let accessToken =
          res.accessToken.indexOf("Bearer") === 0
            ? res.accessToken.split("Bearer ")[1]
            : null;
        if (accessToken) {
          setCookie("accessToken", accessToken, { path: "/" });
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken, { path: "/" });
        }
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: { email: res.user.email, name: res.user.name },
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};
export const singOut = (token: string): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_LOGOUT,
    });
    singOutRequest(token)
      .then((res) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            user: { email: null, name: null },
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
};
export const getUser = (): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_DATA,
    });
    getUserRequestWithAuth()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            user: { email: res.user.email, name: res.user.name },
          });
        } else {
          dispatch({
            type: GET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: GET_USER_DATA_FAILED,
        });
        <Navigate to="login" />;
      });
  };
};
export const sendEmail = (email: EmailType): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_EMAIL,
    });
    sendEmailRequest(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_EMAIL_SUCCESS,
          });
        } else {
          dispatch({
            type: SEND_EMAIL_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: SEND_EMAIL_FAILED,
        });
      });
  };
};
export const sendResetPassword = (
  password: PassWordType,
  code: string
): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_RESET_PASSWORD,
    });
    sendResetPasswordRequest(password, code)
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: SEND_RESET_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: SEND_RESET_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: SEND_RESET_PASSWORD_FAILED,
        });
      });
  };
};
export const sendEditProfileInfo = (
  name: NameType,
  email: EmailType,
  password: PassWordType | null
): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_NEW_PROFILE_INFO,
    });
    sendResetChangeProfileInfo(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PROFILE_INFO_CHANGED_SUCCESS,
            user: { email: res.user.email, name: res.user.name },
          });
        } else {
          dispatch({
            type: PROFILE_INFO_CHANGED_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: PROFILE_INFO_CHANGED_FAILED,
        });
      });
  };
};
