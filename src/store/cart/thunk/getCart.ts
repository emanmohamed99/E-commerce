import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../../index";
import { addOrderAPI, getOrderAPI, checkout } from "../../../services/getCart";
import { getProductAPIbyid } from "../../../services/getProducts";

import { Torders } from "../types";

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const items = state.cart?.items;
    const response = await checkout(items);
    return response;
  }
);
export const fetchProductbyid = createAsyncThunk(
  "item/fetchproductbyid",
  async (ids: string[] | string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await getProductAPIbyid(ids);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Addorders = createAsyncThunk(
  "user/postorders",

  async (userorder: Torders, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await addOrderAPI(userorder);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "user/getorder",

  async (User_id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await getOrderAPI(User_id);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
