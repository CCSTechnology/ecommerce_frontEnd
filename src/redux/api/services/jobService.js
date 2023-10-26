import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const jobList = createAsyncThunk("jobList", async (params, thunkApi) => {
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

export const addJobData = createAsyncThunk("addJobData", async (params, thunkApi) => {
	const { url = "", data = {}, method = "POST" } = params;
	try {
		const response = await SERVER(url, {
			data,
			method,
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const deleteJobData = createAsyncThunk("deleteJobData", async (params, thunkApi) => {
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

export const viewJobData = createAsyncThunk("viewJobData", async (params, thunkApi) => {
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

export const jobCalenderList = createAsyncThunk("jobCalenderList", async (params, thunkApi) => {
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


export const jobVerifyData = createAsyncThunk("jobVerifyData", async (params, thunkApi) => {

	const { url = "", ...others } = params;
	console.log(others);
	try {
		const response = await SERVER({
			url,
			data: others,
			method: "PATCH",
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
})


export const updateStatusData = createAsyncThunk("updateStatusData", async (params, thunkApi) => {

	const { url = "", ...others } = params;
	console.log(others);
	try {
		const response = await SERVER({
			url,
			data: others,
			method: "PATCH",
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
})

export const deleteTaskviewJobData = createAsyncThunk("deleteTaskviewJobData", async (params, thunkApi) => {
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
