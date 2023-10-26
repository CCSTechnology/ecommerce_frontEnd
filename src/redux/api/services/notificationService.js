import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const notificationList = createAsyncThunk("notificationList", async (params, thunkApi) => {
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
})

export const addNotification = createAsyncThunk("addNotification", async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
        const response = await SERVER.post(url, {
            ...data,
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


