import { createAsyncThunk } from "@reduxjs/toolkit";

import getCategoryAPI from "../../../services/getCategory";

export const fetchCategories = createAsyncThunk(
    "categories/fetchcategory",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const { data } = await getCategoryAPI()
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );