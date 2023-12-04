import { createAsyncThunk } from "@reduxjs/toolkit";


import type { RootState } from "../../index";
import checkout from "../../../services/getCart";




export const checkoutCart = createAsyncThunk(
    "cart/checkout",
    async (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const items = state.cart.items;
      const response = await checkout(items);
      return response;
    }
  );