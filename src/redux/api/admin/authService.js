import { createAsyncThunk } from "@reduxjs/toolkit";
import ADMINSERVER from "../../../utils/adminServer";

export const authLogin = createAsyncThunk(
  "authLogin",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.post(url, {
        ...data,
      });
      const { token } = response.data;

      // const fcm_token = await getNewToken();
      // await axios({
      // 	url: baseURL + "/" + authEndPoints.profile.tokenGenerate,
      // 	method: "PATCH",
      // 	headers: {
      // 		authorization: `Bearer ${token}`,
      // 	},
      // 	data: {
      // 		fcm_token,
      // 	},
      // });
      // localStorage.setItem("fcm_token", fcm_token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const notificationViewData = createAsyncThunk(
  "notificationViewData",
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

export const notificationUpdateData = createAsyncThunk(
  "notificationUpdateData",
  async ({ id, order_status }, thunkApi) => {
    try {
      const response = await ADMINSERVER.post(`/notification/update/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("logout", async (params, thunkApi) => {
  const { url } = params;
  try {
    const response = await ADMINSERVER.post(url);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
