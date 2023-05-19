import {
  getUserRequest,
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

export const SEND_REGISTER = "SEND_REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const SEND_LOGIN = "SEND_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SEND_LOGOUT = "SEND_LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";
export const SEND_NEW_PROFILE_INFO = "SEND_NEW_PROFILE_INFO";
export const PROFILE_INFO_CHANGED_SUCCESS = "PROFILE_INFO_CHANGED_SUCCESS";
export const PROFILE_INFO_CHANGED_FAILED = "PROFILE_INFO_CHANGED_FAILED";
export const SEND_EMAIL = "SEND_EMAIL";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";
export const SEND_RESET_PASSWORD = "SEND_RESET_PASSWORD";
export const SEND_RESET_PASSWORD_SUCCESS = "SEND_RESET_PASSWORD_SUCCESS";
export const SEND_RESET_PASSWORD_FAILED = "SEND_RESET_PASSWORD_FAILED";

export const register = (valueEmail, valuePassword, valueName) => {
  return function (dispatch) {
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

export const singIn = (valueEmail, valuePassword) => {
  return function (dispatch) {
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
export const singOut = (token) => {
  return function (dispatch) {
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
export const getUser = () => {
  return function (dispatch) {
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
export const sendEmail = (email) => {
  return function (dispatch) {
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
export const sendResetPassword = (password, code) => {
  return function (dispatch) {
    dispatch({
      type: SEND_RESET_PASSWORD,
    });
    sendResetPasswordRequest(password, code)
      .then((res) => {
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
export const sendEditProfileInfo = (name, email, password) => {
  return function (dispatch) {
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
