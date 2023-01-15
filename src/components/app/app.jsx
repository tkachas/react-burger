import React, {useState, useEffect} from 'react';
import './app.css';

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
    const fetchIngredients = () => {
      fetch(ingredientsUrl)
        .then((res) => res.json())
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
            text: `no data recieved due to ${e.name}`,
            errorMessage: e.message,
          });
        });
    }
    fetchIngredients();
  },[dataError, ingredientsData]);

  const {success, data} = ingredientsData;
  const {hasError, errorName, text, errorMessage} = dataError;

  return (
    <>
      {success && (
        <div className={'content'}>
          <BurgerIngredients ingredients={data}/>
          <BurgerConstructor ingredients={data}/>
        </div>
      )}
      {(hasError || !success) && (
        <>
          <h1>
            {text}
          </h1>
          <p>
            {errorName}: {errorMessage}
          </p>
        </>
      )}
      <AppHeader/>
    </>
  );
}

export default App;
