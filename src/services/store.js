import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import ingredientsReducer from "./slices/ingredients/ingredients-slice";
import constructorReducer from "./slices/constructor/constructor-slice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constrState: constructorReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
