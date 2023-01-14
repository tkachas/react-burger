import React, {useState, useEffect} from 'react';
import './app.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
  
  return (
    <>
      <AppHeader/>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </>
  );
}

export default App;
