import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const productViewService = createAsyncThunk("productViewService", async(params, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.get(`/product`, {
      params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})

export const productListService = createAsyncThunk("productListService", async(params, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.get("/products", {
        params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})