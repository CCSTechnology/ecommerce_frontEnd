import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const addProductData = createAsyncThunk(
  "addEmployeeyData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await SERVER.post(
        url,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editProductData = createAsyncThunk(
  "editProductData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await SERVER.post(
        url,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
// get
export const productListData = createAsyncThunk(
  "employeeListData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await SERVER({
        url,
        params: others,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProductData = createAsyncThunk(
  "deleteProductData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await SERVER.put(url, {
        ...data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const viewProductData = createAsyncThunk(
  "viewProductData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await SERVER({
        url,
        params: others,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
  

export const commonListData = createAsyncThunk(
  "commonListData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await SERVER({
        url,
        params: others,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
