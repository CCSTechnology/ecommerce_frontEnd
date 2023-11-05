import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const categoryListService = createAsyncThunk("categoryListService", async(params, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.get("/categories", {
        params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})