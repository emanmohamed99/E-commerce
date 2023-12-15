import { createAsyncThunk } from "@reduxjs/toolkit";


import type { RootState } from "../../index";
import checkout from "../../../services/getCart";
import { getProductAPIbyid } from "../../../services/getProducts";

import axios from "axios";

import { Torders } from "../types";




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
  
    export const Addorders = createAsyncThunk(
      "user/postorders",
      
      async (userorder: Torders, thunkAPI) => {
      
        console.log(userorder,"orders");
        const { rejectWithValue } = thunkAPI;
        try {
          // const { data } = await axios.post(`http://localhost:7400/orders`, userorder);
          // console.log(data); 
          // return data;
        } catch (error) {
          return rejectWithValue(error);
        }
     
      }
      
    );
    
      
   
       
       