import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchIngredients, ingredientsURL } from "../../api";

export const fetchIngredientsData = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetchIngredients(ingredientsURL);
    return response.data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: null,
    loading: false,
    error: null,
    success: false,
    selectedIngredient: null,
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
