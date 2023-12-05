import {  createSlice } from "@reduxjs/toolkit";
import { initialStateProduct } from "./intialState";
import { fetchProducts, fetchproduct } from "./thunk/getProduct";
const itemsSlice = createSlice({
  name: "items",
  initialState:initialStateProduct,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
        state.error = null;
     
    })
    
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
        state.products = action.payload;
     
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
      state.products = action.payload;
     
    })
    builder.addCase(fetchproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message||"";
       
     
    })
  },
});
export default itemsSlice.reducer;

