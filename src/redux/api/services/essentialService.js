import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const essentialList = createAsyncThunk("essentialList", async (params, thunkApi) => {
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