import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const addEmployeeData = createAsyncThunk(
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
// get
export const customerListData = createAsyncThunk(
  "customerListData",
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

export const deleteEmployeeData = createAsyncThunk(
  "deleteDirectoryData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await SERVER.delete(url, {
        ...data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const viewEmployeeData = createAsyncThunk(
  "viewEmployeeData",
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
