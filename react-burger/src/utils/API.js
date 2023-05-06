import { getCookie, setCookie } from "./cookie";

export const PUBLIC_URL = "https://norma.nomoreparties.space/api/";
const getResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const sendOrderRequest = (idArray) =>
  fetch(`${PUBLIC_URL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: idArray,
    }),
  }).then(getResponse);
export const sendGetIngredientsRequest = () => {
  return fetch(`${PUBLIC_URL}ingredients`).then(getResponse);
};
export const sendRegisterRequest = (email, password, name) =>
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
export const singInRequest = (email, password) =>
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
export const singOutRequest = (token) =>
  fetch(`${PUBLIC_URL}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
    }),
  }).then(getResponse);
export const sendEmailRequest = (email) =>
  fetch(`${PUBLIC_URL}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
    }),
  }).then(getResponse);
export const sendResetPasswordRequest = (password, code) =>
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
export const sendResetChangeProfileInfo = (name, email, password) =>
  fetch(`${PUBLIC_URL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ email: email, name: name, password: password }),
  }).then(getResponse);
const refreshToken = (token) => {
  return fetch(`${PUBLIC_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
    }),
  })
    .then(getResponse)
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
    });
};
const getUserRequest = (token) =>
  fetch(`${PUBLIC_URL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);

export const getUserRequestWithAuth = () => {
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
        return getUserRequest(newToken).then((res) => {
          return res;
        });
      });
    });
};
