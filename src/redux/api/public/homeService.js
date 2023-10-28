import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../../utils/publicServer";

export const homeDataService = createAsyncThunk("homeDataService", async(params, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.get("", {
        params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})