import { getCookie, setCookie } from "./cookie";
import { Navigate } from "react-router-dom";

export const PUBLIC_URL = "https://norma.nomoreparties.space/api/";
const getResponse = (res) => {
  if (!res.ok) throw new Error(`Ошибка запроса ${res.status}`);
  return res.json();
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
export const getUserRequest = () =>
  fetchWithAuth(`${PUBLIC_URL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
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
        setCookie("accessToken", accessToken);
      }
      if (refreshToken) {
        setCookie("refreshToken", refreshToken);
      }
    });
};

function isTokenExpired(token) {
  const tokenParts = token.split(".");
  const payload = tokenParts[1];
  const decodedPayload = JSON.parse(atob(payload));
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedPayload.exp < currentTime;
}

export async function fetchWithAuth(url, options) {
  let tokenData = null;
  if (getCookie("accessToken")) {
    tokenData = getCookie("accessToken");
  } else {
    return <Navigate to="/login" />;
  }
  if (tokenData) {
    if (isTokenExpired(tokenData)) {
      try {
        await refreshToken(getCookie("refreshToken"));
      } catch (error) {
        return <Navigate to="/login" />;
      }
    }
    const token = getCookie("accessToken");
    options.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(url, options);
}
