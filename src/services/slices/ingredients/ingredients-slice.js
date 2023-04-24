import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    loading: false,
    error: {},
    success: false,
    currentTab: "one",
    modalOpen: false,
    selectedIngredient: null,
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    setIngredientsData: (state, action) => {
      state.items = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentTab,
  setModalOpen,
  setSelectedIngredient,
  setIngredientsData,
  setSuccess,
  setError,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
