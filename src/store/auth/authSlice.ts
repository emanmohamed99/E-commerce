import {  createSlice } from "@reduxjs/toolkit";
import {   loginuser, registerUser, UpdateUser, } from './thunk/getAuth';
import { initialStateAuth } from "./intialState";
const authSlice = createSlice({
    name: "auth",
  initialState:initialStateAuth,
  reducers:{
    logout: (state) => {
      state.currentUser2 = initialStateAuth.currentUser2;
     
    },
    login(state, action) {
      state.currentUser2 = action.payload;
     
    },

  },extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
          state.error = null;
       
      })
      builder.addCase(registerUser.fulfilled, (state,action) => {
        state.loading = false;
        state.user=action.payload.users
        state.token = action.payload.accessToken;
       
       
      })
      builder.addCase(registerUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message||"";
      })
      builder.addCase(loginuser.pending, (state) => {
        state.loading = true;
          state.error = null;
       
      })
      builder.addCase(loginuser.fulfilled, (state,action) => {
        state.loading = false;
        state.user=action.payload.users
        state.token = action.payload.accessToken;
       
       
      })
      builder.addCase(loginuser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message||"";
      })
    
      builder.addCase(UpdateUser.pending, (state) => {
        state.loading = true;
          state.error = null;
       
      })
      builder.addCase(UpdateUser.fulfilled, (state,action) => {
        state.loading = false;
 
        state.UpdateUser = action.payload;
       
      })
      builder.addCase(UpdateUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message||"";
      })
  },

}
)
export const { logout } = authSlice.actions;
export const { login } = authSlice.actions;
export default authSlice.reducer;