import {  createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateProduct } from "./intialState";
import { fetchProducts } from "./thunk/getProduct";
import { product } from "./types";
import axios from "axios";
export const fetchproduct = createAsyncThunk(
  "posts/fetchproduct",
  async (cat_prefix:string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
     
      const { data } = await axios.get(`http://localhost:7400/items?cat_prefix=${cat_prefix}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const itemsSlice = createSlice({
  name: "items",
  initialState:initialStateProduct,
  reducers: {
    receivedProducts(state, action: PayloadAction<product[]>) {
      const products = action.payload;

      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
        state.error = null;
     
    })
    
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
        state.products = action.payload;
         state.error = null;
     
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"";
       
     
    })
    builder.addCase(fetchproduct.pending, (state) => {
      state.loading = true;
      state.error = null;
     
    })
    
    builder.addCase(fetchproduct.fulfilled, (state, action) => {
      state.loading = false;
     
      state.product = action.payload;
     
    })
    builder.addCase(fetchproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"";
       
     
    })
  },
});
export default itemsSlice.reducer;
export const { receivedProducts } = itemsSlice.actions;
