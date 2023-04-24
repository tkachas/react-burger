import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {
  setError,
  setIngredientsData,
  setSuccess,
} from "../../services/slices/ingredients/ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const { items: ingredients } = useSelector((state) => state.ingredients);

  const success = useSelector((state) => state.ingredients.success);

  const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";
  useEffect(() => {
    const fetchIngredients = async () => {
      fetch(ingredientsUrl)
        .then((res) =>
          res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
        )
        .then((data) => {
          dispatch(setIngredientsData(data.data));
          dispatch(setSuccess(true));
        })
        .catch((e) => {
          dispatch(setSuccess(false));
          dispatch(
            setError({
              hasError: true,
              errorName: e.name,
              text: `No data recieved due to ${e.name}. Try reloading the page later.`,
              errorMessage: e.message,
            })
          );
        });
    };
    fetchIngredients();
  }, []);

  // useEffect(() => {
  //   dispatch(fetchIngredientsData());
  // }, [dispatch]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.app}>
          <AppHeader />
          {success && (
            <section className={styles.content}>
              <BurgerIngredients />
              <BurgerConstructor />
            </section>
          )}
        </main>
      </DndProvider>
    </>
  );
}

export default App;
