export const apiUrl = "https://norma.nomoreparties.space/api";
export const ingredientsURL = "/ingredients";
export const orderUrl = "/orders";

export const fetchIngredients = async (additionUrl) => {
  const finalUrl = apiUrl + additionUrl;
  return fetch(finalUrl)
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => data)
    .catch((e) => {
      throw e;
    });
};

export const sendOrder = (orderUrl, ingredients) => {
  return fetch(apiUrl + orderUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Could not send order, received ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};
