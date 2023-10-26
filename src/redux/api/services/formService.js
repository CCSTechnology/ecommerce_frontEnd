import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const addFormData = createAsyncThunk("addFormData", async (params, thunkApi) => {
	const { url = "", data = {} } = params;
	try {
		const response = await SERVER.post(
			url,
			{
				...data,
			},
			// {
			// 	headers: {
			// 		"Content-Type": "multipart/form-data",
			// 	},
			// }
		);
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const formList = createAsyncThunk("formList", async (params, thunkApi) => {
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
});

export const formView = createAsyncThunk("formView", async (params, thunkApi) => {
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
});

export const deleteForm = createAsyncThunk("deleteForm", async (params, thunkApi) => {
	const { url = "" } = params;
	try {
		const response = await SERVER({
			url,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const formListGetById = createAsyncThunk("formListGetById", async (params, thunkApi) => {
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
});

export const editFormData = createAsyncThunk("editFormData", async (params, thunkApi) => {
	const { url = "", data = {} } = params;
	try {
		const response = await SERVER.put(url, {
			...data,
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});
