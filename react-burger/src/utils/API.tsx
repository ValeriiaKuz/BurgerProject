import { getCookie, setCookie } from "./cookie";
import { TIngredient } from "./types/ingredient-types";
import { EmailType, NameType, PassWordType } from "../services/actions/auth";

type URLType = "https://norma.nomoreparties.space/api/";
type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};
interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}
interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;

  clone(): Response;
}

export const PUBLIC_URL: URLType = "https://norma.nomoreparties.space/api/";
const getResponse = <T,>(res: CustomResponse<T>): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const sendGetIngredientsRequest = (): Promise<
  TResponseBody<"data", Array<TIngredient>>
> => {
  return fetch(`${PUBLIC_URL}ingredients`).then(getResponse);
};
export const sendOrderRequest = (
  idArray: Array<string>
): Promise<TResponseBody<"order", { number: number }>> =>
  fetch(`${PUBLIC_URL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: idArray,
    }),
  }).then(getResponse);

export const sendRegisterRequest = (
  email: EmailType,
  password: PassWordType,
  name: NameType
): Promise<
  TResponseBody<"user", { name: NameType; email: EmailType }> & {
    accessToken: string;
    refreshToken: string;
  }
> =>
  fetch(`${PUBLIC_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(getResponse);
export const singInRequest = (
  email: string,
  password: string
): Promise<
  TResponseBody<"user", { name: NameType; email: EmailType }> & {
    accessToken: string;
    refreshToken: string;
  }
> =>
  fetch(`${PUBLIC_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(getResponse);
export const singOutRequest = (token: string): Promise<TResponseBody> =>
  fetch(`${PUBLIC_URL}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
    }),
  }).then(getResponse);
export const sendEmailRequest = (email: EmailType): Promise<TResponseBody> =>
  fetch(`${PUBLIC_URL}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
    }),
  }).then(getResponse);
export const sendResetPasswordRequest = (
  password: PassWordType,
  code: string
): Promise<TResponseBody> =>
  fetch(`${PUBLIC_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  }).then(getResponse);
export const sendResetChangeProfileInfo = (
  name: NameType,
  email: EmailType,
  password: PassWordType | null
): Promise<TResponseBody<"user", { name: NameType; email: EmailType }>> =>
  fetch(`${PUBLIC_URL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ email: email, name: name, password: password }),
  }).then(getResponse);
const refreshTokenRequest = (
  token: string
): Promise<
  TResponseBody<"user", { name: NameType; email: EmailType }> & {
    accessToken: string;
    refreshToken: string;
  }
> =>
  fetch(`${PUBLIC_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
    }),
  }).then(getResponse);
export const refreshToken = (token: string): Promise<void> => {
  return refreshTokenRequest(token).then((res) => {
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
  });
};
const getUserRequest = (
  token: string
): Promise<TResponseBody<"user", { name: NameType; email: EmailType }>> =>
  fetch(`${PUBLIC_URL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);

export const getUserRequestWithAuth = (): Promise<
  TResponseBody<"user", { name: NameType; email: EmailType }>
> => {
  const token = getCookie("accessToken");
  if (!token) {
    return Promise.reject(new Error("User not authorized"));
  }
  return getUserRequest(token)
    .then((res) => {
      return res;
    })
    .catch(() => {
      const refreshTokenValue = getCookie("refreshToken");
      if (!refreshTokenValue) {
        return Promise.reject(new Error("User not authorized"));
      }
      return refreshToken(refreshTokenValue).then(() => {
        const newToken = getCookie("accessToken");
        return getUserRequest(newToken!).then((res) => {
          return res;
        });
      });
    });
};
