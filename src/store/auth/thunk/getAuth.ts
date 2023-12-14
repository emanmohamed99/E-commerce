import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tlogin, Tresgister } from "../types";
export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, thunkAPI) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { rejectWithValue } = thunkAPI;
      try {
        const { data } = await axios.get(`http://localhost:7400/users`,config);
  
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  export const registerUser=createAsyncThunk(
    "user/register",
    async (registerData:Tresgister, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          const { data } = await axios.post("http://localhost:7400/register",
            registerData
          );
          return data;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
)
export const loginuser = createAsyncThunk(
    "user/login",
    async (loginData:Tlogin, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const { data } = await axios.post(
          "http://localhost:7400/login",
          loginData
        );
  
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );