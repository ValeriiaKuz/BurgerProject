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
} from "../../services/constants/constants";
import { EmailType, NameType } from "../../services/actions/auth";

export type TGetUserAction = {
  readonly type: typeof GET_USER_DATA;
};
export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly user: { email: EmailType; name: NameType };
};
export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_DATA_FAILED;
};
export type TLoginAction = {
  readonly type: typeof SEND_LOGIN;
};
export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: { email: EmailType; name: NameType };
};
export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
};
export type TLogoutAction = {
  readonly type: typeof SEND_LOGOUT;
};
export type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly user: { email: EmailType | null; name: NameType | null };
};
export type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
};
export type TProfileAction = {
  readonly type: typeof SEND_NEW_PROFILE_INFO;
};
export type TProfileSuccessAction = {
  readonly type: typeof PROFILE_INFO_CHANGED_SUCCESS;
  readonly user: { email: EmailType; name: NameType };
};
export type TProfileFailedAction = {
  readonly type: typeof PROFILE_INFO_CHANGED_FAILED;
};
export type TRegisterAction = {
  readonly type: typeof SEND_REGISTER;
};
export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: { email: EmailType; name: NameType };
};
export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
};
export type TEmailAction = {
  readonly type: typeof SEND_EMAIL;
};
export type TEmailSuccessAction = {
  readonly type: typeof SEND_EMAIL_SUCCESS;
};
export type TEmailFailedAction = {
  readonly type: typeof SEND_EMAIL_FAILED;
};
export type TPasswordAction = {
  readonly type: typeof SEND_RESET_PASSWORD;
};
export type TPasswordSuccessAction = {
  readonly type: typeof SEND_RESET_PASSWORD_SUCCESS;
};
export type TPasswordFailedAction = {
  readonly type: typeof SEND_RESET_PASSWORD_FAILED;
};
export type TAuthActions =
  | TGetUserAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TLoginAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TLogoutAction
  | TLogoutSuccessAction
  | TLogoutFailedAction
  | TProfileAction
  | TProfileSuccessAction
  | TProfileFailedAction
  | TRegisterAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TEmailAction
  | TEmailSuccessAction
  | TEmailFailedAction
  | TPasswordAction
  | TPasswordSuccessAction
  | TPasswordFailedAction;
