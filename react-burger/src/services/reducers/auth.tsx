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
import { TAuthActions } from "../../utils/types/auth-types";
type TAuthState = Omit<typeof initialState, "user"> & {
  user: { email: null | string; name: null | string };
};
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
export const authReducer = (
  state: TAuthState = initialState,
  action: TAuthActions
): TAuthState => {
  switch (action.type) {
    case SEND_REGISTER: {
      return {
        ...state,
        isLoadingRegister: true,
        isErrorRegister: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        isLoadingRegister: false,
        isUser: true,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isErrorRegister: true,
        isLoadingRegister: false,
      };
    }
    case SEND_LOGIN: {
      return {
        ...state,
        isLoadingLogin: true,
        isErrorLogin: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        isLoadingLogin: false,
        isUser: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isErrorLogin: true,
        isLoadingLogin: false,
      };
    }
    case SEND_LOGOUT: {
      return {
        ...state,
        isLoadingLogout: true,
        isErrorLogout: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        isLoadingLogout: false,
        isUser: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isErrorLogout: true,
        isLoadingLogout: false,
      };
    }
    case GET_USER_DATA: {
      return {
        ...state,
        isLoadingUser: true,
        isErrorUser: false,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        isLoadingUser: false,
        isUser: true,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        isErrorUser: true,
        isLoadingUser: false,
      };
    }
    case SEND_NEW_PROFILE_INFO: {
      return {
        ...state,
        isLoadingNewProfileInfo: true,
      };
    }
    case PROFILE_INFO_CHANGED_SUCCESS: {
      return {
        ...state,
        isLoadingNewProfileInfo: false,
        isUser: true,
        user: { email: action.user.email, name: action.user.name },
      };
    }
    case PROFILE_INFO_CHANGED_FAILED: {
      return {
        ...state,
        isLoadingNewProfileInfo: false,
        isErrorNewProfileInfo: true,
      };
    }
    case SEND_EMAIL: {
      return {
        ...state,
        isLoadingEmail: true,
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        isLoadingEmail: false,
        emailSendSuccess: true,
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...state,
        emailSendSuccess: false,
        isLoadingEmail: false,
      };
    }
    case SEND_RESET_PASSWORD: {
      return {
        ...state,
        isLoadingReset: true,
      };
    }
    case SEND_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoadingReset: false,
        resetSuccess: true,
      };
    }
    case SEND_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        isLoadingReset: false,
        resetSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
