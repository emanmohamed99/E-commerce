import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tlogin, Tresgister, TuserUpdate } from "../types";
import { postAuthloginAPI, postAuthregisterAPI, updateAuthUsersAPI } from "../../../services/getAuth";

export const registerUser = createAsyncThunk(
  "user/register",
  async (registerData: Tresgister, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await postAuthregisterAPI(registerData)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loginuser = createAsyncThunk(
  "user/login",
  async (loginData: Tlogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await 
      postAuthloginAPI(loginData)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const UpdateUser = createAsyncThunk(
  "user/updateUser",
  async (dataUpdate: TuserUpdate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await updateAuthUsersAPI(dataUpdate)
   
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
