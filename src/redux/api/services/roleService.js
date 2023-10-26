import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const rolesList = createAsyncThunk("rolesList", async (params, thunkApi) => {
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

export const addRoleData = createAsyncThunk("addRoleData", async (params, thunkApi) => {
    const { url = "", data = {}, method = "POST" } = params;
    try {
        const response = await SERVER({
            url,
            data,
            method: method
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const deleteRoleData = createAsyncThunk("deleteRoleData", async (params, thunkApi) => {
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

export const rolePermissionData = createAsyncThunk("rolePermissionData", async (params, thunkApi) => {
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

export const roleSavePermission = createAsyncThunk("roleSavePermission", async (params, thunkApi) => {
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