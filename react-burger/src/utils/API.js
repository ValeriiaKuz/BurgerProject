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
