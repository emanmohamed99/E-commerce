import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../index";

import { initialStateCart } from "./intialState";
import { Tproduct } from "../product/types";
import {
  Addorders,
  checkoutCart,
  fetchProductbyid,
  getOrder,
} from "./thunk/getCart";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart(state, action: PayloadAction<Tproduct>) {
      const { id, max_quantity } = action.payload;

      if (state.items[id] && state.items[id].quantity < max_quantity) {
        //1//2
        state.items[id].quantity++;
      } else if (state.items[id] && state.items[id].quantity >= max_quantity) {
        //3 or more
        state.items[id].quantity = max_quantity;
      } else {
        state.items[id] = {
          quantity: 1,
        };
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      const indexToRemove = state.productsData.findIndex(
        (item) => item.id === idToRemove
      );

      if (indexToRemove !== -1) {
        state.productsData.splice(indexToRemove, 1);
        delete state.items[action.payload];
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
        max_quantity: number;
      }>
    ) {
      const { id, quantity, max_quantity } = action.payload;
      if (quantity <= max_quantity) {
        state.items[id].quantity = quantity;
      } else if (quantity > 3) {
        state.items[id].quantity = max_quantity;
      }
    },
  },
  extraReducers: function (builder) {
    builder.addCase(checkoutCart.pending, (state) => {
      state.checkoutState = "LOADING";
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      checkoutCart.fulfilled,
      (state, action: PayloadAction<{ success: boolean }>) => {
        const { success } = action.payload;
        if (success) {
          state.checkoutState = "READY";
          state.loading = false;
          state.items = {};
          state.productsData = [];
        } else {
          state.checkoutState = "ERROR";
        }
      }
    );
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.loading = false;
      state.error = action.error.message || "";
      state.errorMessage = action.error.message || "";
    });
    builder.addCase(fetchProductbyid.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductbyid.fulfilled, (state, action) => {
      state.loading = false;
      state.productsData = action.payload;
    });
    builder.addCase(fetchProductbyid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
    builder.addCase(Addorders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(Addorders.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    });
    builder.addCase(Addorders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.userorder = action.payload;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0;
    for (const id in items) {
      numItems += items[id].quantity;
    }
    return numItems;
  }
);
export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.cart.productsData,
  (items, productsData) => {
    let total = 0;

    for (const id in items) {
      const indexToRemove = productsData.findIndex((item) => item.id === +id);

      if (indexToRemove >= 0) {
        total +=
          parseInt(productsData[indexToRemove].price) * items[id].quantity;
      }
    }
    return total;
  }
);

export const { addToCart } = cartSlice.actions;
export const { removeFromCart } = cartSlice.actions;
export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
