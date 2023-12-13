import {  createSlice } from "@reduxjs/toolkit";
import { getUser, loginuser, registerUser } from "./thunk/getAuth";
import { initialStateAuth } from "./intialState";
const authSlice = createSlice({
    name: "auth",
  initialState:initialStateAuth,
  reducers:{

  },extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
          state.error = null;
       
      })
      builder.addCase(registerUser.fulfilled, (state,action) => {
        state.loading = false;
        state.user=action.payload.users
        state.token = action.payload.accessToken;
        localStorage.setItem('token',action.payload.accessToken);
       
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
        localStorage.setItem('token',action.payload.accessToken);
       
      })
      builder.addCase(loginuser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message||"";
      })
      builder.addCase(getUser.pending, (state) => {
        state.loading = true;
          state.error = null;
       
      })
      builder.addCase(getUser.fulfilled, (state,action) => {
        state.loading = false;
        state.currentUser=action.payload[0];
       
      })
      builder.addCase(getUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message||"";
      })
  },
  

}
)
export default authSlice.reducer;