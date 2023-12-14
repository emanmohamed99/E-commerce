import { createAsyncThunk } from "@reduxjs/toolkit";


import type { RootState } from "../../index";
import checkout from "../../../services/getCart";
import { getProductAPIbyid } from "../../../services/getProducts";




export const checkoutCart = createAsyncThunk(
    "cart/checkout",
    async (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const items = state.cart.items;
      const response = await checkout(items);
      return response;
    }
  );
  export const fetchProductbyids = createAsyncThunk(
    "item/fetchproductbyid",
    async (ids:string[]|undefined[], thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const { data } = await getProductAPIbyid(ids);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    })