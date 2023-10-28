import { createAsyncThunk } from "@reduxjs/toolkit";
import ADMINSERVER from "../../../utils/adminServer";

export const addEmployeeData = createAsyncThunk(
  "addEmployeeyData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.post(
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
export const customerListData = createAsyncThunk(
  "customerListData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await ADMINSERVER({
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

export const deleteCustomerData = createAsyncThunk(
  "deleteCustomerData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.delete(url, {
        ...data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const viewCustomerData = createAsyncThunk(
  "viewEmployeeData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await ADMINSERVER({
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
