import React, {useState, useEffect} from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [ingredientsData, setIngredientsData] = useState({
    success: false,
    data: [],
  });
  const [dataError, setDataError] = useState({
    hasError: null,
    errorName: null,
    text: null,
    errorMessage: null,
  });

  const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
  useEffect(()=>{
    const fetchIngredients = async () => {
      fetch(ingredientsUrl)
        .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
        .then((data) => {
          setIngredientsData({
            ...ingredientsData,
            success: data.success,
            data: data.data,
          });
        })
        .catch((e)=>{
          setIngredientsData({...ingredientsData, success: false});
          setDataError({
            ...dataError,
            hasError: true,
            errorName: e.name,
            text: `No data recieved due to ${e.name}. Try reloading the page later.`,
            errorMessage: e.message,
          });
        });
    }
    fetchIngredients();
  },[ingredientsData.success]);

  const {success, data} = ingredientsData;
  const {hasError, errorName, text, errorMessage} = dataError;

  return (
    <>
      {success && !hasError && (
        <div className={styles.content}>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data}/>
        </div>
      )}
      {(hasError || !success) && (
        <div style={{marginLeft: "50%", marginTop: "50%", transform: "translate(-50%, -50%)"}}>
          <h1>
            {text}
          </h1>
          <p>
            {errorName}: {errorMessage}
          </p>
        </div>
      )}
      <AppHeader/>
    </>
  );
}

export default App;
