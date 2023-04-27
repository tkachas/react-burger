import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrder, orderUrl } from "../../api";

export const getOrder = createAsyncThunk(
  "constrState/createOrder",
  async (ingredients) => {
    const response = await sendOrder(orderUrl, ingredients);
    return response;
  }
);

export const constructorSlice = createSlice({
  name: "constrState",
  initialState: {
    addedIngredients: [],
    orderModalOpen: false,
    orderDetails: null,
    loading: false,
    error: null,
    success: false,
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
      state.addedIngredients = state.addedIngredients.concat(action.payload);
      const bun = state.addedIngredients.find(
        (ingredient) => ingredient.type === "bun"
      );

      // Убираем булку из списка ингредиентов
      const nonBunIngredients = state.addedIngredients.filter(
        (ingredient) => ingredient.type !== "bun"
      );

      // Если ингредиент - это булка
      if (bun) {
        const topBun = { ...bun, bunType: "top" };
        const bottomBun = { ...bun, bunType: "bottom" };
        state.addedIngredients = [topBun, ...nonBunIngredients, bottomBun];
      } else {
        state.addedIngredients = nonBunIngredients;
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
    clearOrder: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetails = action.payload;
        console.log(state.orderDetails);
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setBunCount,
  setIsBun,
  setEnableDragIcon,
  addIngredient,
  deleteIngredient,
  reorderIngredient,
  setDraggingItemId,
  clearOrder,
} = constructorSlice.actions;

export default constructorSlice.reducer;
