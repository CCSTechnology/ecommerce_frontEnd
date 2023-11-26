import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const addCartServices = createAsyncThunk("addCartServices", async(params, thunkApi)=>{
  const {id, ...data} = params
  try {
    const response = await PUBLICSERVER.post("/cart/save", data, {
      params : {
        cart_id :id
      }
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})


export const cartViewServices = createAsyncThunk("cartViewServices", async(params, thunkApi)=>{
  
  try {
    const response = await PUBLICSERVER.get("/cart/view", {
      params
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})


export const getAddressServices = createAsyncThunk("getAddressServices", async(data, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.post("/guest/address", data)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})



export const checkOutWithUser = createAsyncThunk("checkOutWithUser", async(data, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.post("/customer/order/save", data)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})

export const checkOutWithGuest = createAsyncThunk("checkOutWithGuest", async(data, thunkApi)=>{
  try {
    const response = await PUBLICSERVER.post("/guest/order/save", data)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }  
})

