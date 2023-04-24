import { createSlice } from "@reduxjs/toolkit";

export const constructorSlice = createSlice({
  name: "constrState",
  initialState: {
    addedIngredients: [],
    orderModalOpen: false,
    nowDragging: null,
  },
  reducers: {
    setOrderModalOpen: (state, action) => {
      state.orderModalOpen = action.payload;
    },
    setBunCount: (state, action) => {
      state.bunCount = action.payload;
    },
    setIsBun: (state, action) => {
      state.isBun = action.payload;
    },
    setEnableDragIcon: (state, action) => {
      state.enableDragIcon = action.payload;
    },
    addIngredient: (state, action) => {
      const newIngredient = action.payload;

      // Если ингредиент - это булка
      if (newIngredient.type === "bun") {
        state.addedIngredients = state.addedIngredients.filter(
          (ingredient) => ingredient.type !== "bun"
        );
        state.addedIngredients = state.addedIngredients.concat(newIngredient);
      } else {
        state.addedIngredients = state.addedIngredients.concat(newIngredient);
      }
    },
    deleteIngredient: (state, action) => {
      state.addedIngredients = state.addedIngredients.filter(
        (ingredient, index) => index !== action.payload
      );
    },
    reorderIngredient: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const nonBunIngredients = state.addedIngredients.filter(
        (ingredient) => ingredient.type !== "bun"
      );

      const [removed] = nonBunIngredients.splice(sourceIndex - 1, 1);
      nonBunIngredients.splice(destinationIndex - 1, 0, removed);

      const bun = state.addedIngredients.find(
        (ingredient) => ingredient.type === "bun"
      );

      state.addedIngredients = bun
        ? [bun, ...nonBunIngredients, bun]
        : nonBunIngredients;
    },
    setDraggingItemId: (state, action) => {
      state.nowDragging = action.payload;
    },
  },
});

export const {
  setOrderModalOpen,
  setBunCount,
  setIsBun,
  setEnableDragIcon,
  addIngredient,
  deleteIngredient,
  reorderIngredient,
  setDraggingItemId,
} = constructorSlice.actions;

export default constructorSlice.reducer;
