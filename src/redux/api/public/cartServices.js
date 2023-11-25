import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const addCartServices = createAsyncThunk("addCartServices", async(data, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.post("/cart/save", data)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})