import { createAsyncThunk } from "@reduxjs/toolkit";
import ADMINSERVER from "../../../utils/adminServer";

export const dashboardListDatas = createAsyncThunk(
  "dashboardListDatas",
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
