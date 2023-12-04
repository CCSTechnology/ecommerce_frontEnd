import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const homeDataService = createAsyncThunk("homeDataService", async(params, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.get("/homepage", {
        params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})


export const headerSearch = createAsyncThunk("headerSearch", async(params, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.get("/producthomesearch", {
        params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})