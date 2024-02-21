import {  createSlice } from "@reduxjs/toolkit";

import { initialStateCategory } from "./intialState";
import { fetchCategories } from "./thunk/getCategory";



  



const categorySlice = createSlice({
  name: "category",
  initialState:initialStateCategory,
  reducers: {},
 extraReducers(builder) {
  builder.addCase(fetchCategories.pending, (state) => {
    state.loading = true;
      state.error = null;
   
  })
  
  builder.addCase(fetchCategories.fulfilled, (state, action) => {
    state.loading = false;
      state.categories = action.payload;
       state.error = null;
   
  })
  builder.addCase(fetchCategories.rejected, (state, action) => {
    state.error = action.error.message||"";
     
   
  })
 },
});

export default categorySlice.reducer;
