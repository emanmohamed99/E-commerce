import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../index";


import { initialStateCart } from "./intialState";
import { product } from '../product/types';
import { checkoutCart } from "./thunk/getCart";


const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addToCart(state, action: PayloadAction<product>) {
      
      const CartId = action.payload.id;
      const CartMax_quentity = action.payload.max_quantity;

      if (state.items[CartId]&&state.items[CartId].quantity<CartMax_quentity) {
        state.items[CartId].quantity++;
      
      } else if(state.items[CartId]&&state.items[CartId].quantity>=CartMax_quentity){
        state.items[CartId].quantity = CartMax_quentity;
     
      }else{
        state.items[CartId]={
          product:action.payload,
          quantity:1
        }
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
        max_quantityProduct: number;
      }>
    ) {
      const { id, quantity, max_quantityProduct } = action.payload;
      if (quantity <= max_quantityProduct) {
        state.items[id].quantity = quantity;
      } else if (quantity > 3) {
        state.items[id].quantity = max_quantityProduct;
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
  (items ) => {
    let total = 0;
    for (const id in items) {
      total += parseInt(items[id].product.price) * items[id].quantity;
    }
    return total.toFixed(2);
  }
);
export const { addToCart } = cartSlice.actions;
export const { removeFromCart } = cartSlice.actions;
export const { updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
