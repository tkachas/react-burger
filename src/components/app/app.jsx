import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { fetchIngredientsData } from "../../services/slices/ingredients/ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.ingredients.success);

  useEffect(() => {
    dispatch(fetchIngredientsData());
  }, [dispatch]);

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
