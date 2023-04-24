const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = async () => {
  return fetch(ingredientsUrl)
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => data)
    .catch((e) => {
      throw e;
    });
};
