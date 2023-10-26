import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const approvedChangeData = createAsyncThunk("directoryList", async (params, thunkApi) => {
    console.log(params);
    const { url = "", data, ...others } = params;
    try {
        const response = await SERVER({
            url,
            params: others,
            data: data,
            method: "PATCH",
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})