import { createAsyncThunk } from "@reduxjs/toolkit";

import {getProductsAPI,getProductAPI} from "../../../services/getProducts";

export const fetchProducts = createAsyncThunk(
    "item/fetchproducts",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const { data } = await getProductsAPI();
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    })
    export const fetchproduct = createAsyncThunk(
      "item/fetchproduct",
      async (cat_prefix:string|undefined, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const { data } = await getProductAPI(cat_prefix) ;
          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );
   