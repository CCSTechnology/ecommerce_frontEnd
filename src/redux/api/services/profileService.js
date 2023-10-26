import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const getMe = createAsyncThunk("getMe", async (params, thunkApi) => {
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


export const changePassword = createAsyncThunk(
	"changePassword",
	async (params, thunkApi) => {
		const { url, data } = params;
		try {
			const response = await SERVER.post(url, {
				...data,
			});
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const updateMeData = createAsyncThunk(
	"updateMeData",
	async (params, thunkApi) => {
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
