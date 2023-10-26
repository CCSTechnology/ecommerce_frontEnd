import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const directoryList = createAsyncThunk("directoryList", async (params, thunkApi) => {
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

export const addDirectoryData = createAsyncThunk("addDirectoryData", async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
        const response = await SERVER.post(url, {
            ...data,
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const deleteDirectoryData = createAsyncThunk("deleteDirectoryData", async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
        const response = await SERVER.delete(url, {
            ...data,
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const viewDirectoryData = createAsyncThunk("directoryView", async (params, thunkApi) => {
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


