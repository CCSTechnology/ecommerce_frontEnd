import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER, { baseURL } from "..";
import { getNewToken } from "../../../firebase";
import { authEndPoints } from "helpers/endpoints";
import axios from "axios";

export const authRegister = createAsyncThunk("authRegister", async (params, thunkApi) => {
	const { data = {}, url = "" } = params;
	try {
		const response = await SERVER.post(url, {
			...data,
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const authLogin = createAsyncThunk("authLogin", async (params, thunkApi) => {
	const { url = "", data = {} } = params;
	try {
		const response = await SERVER.post(url, {
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
});

export const forgetPassword = createAsyncThunk("forgetPassword", async (params, thunkApi) => {
	const { url, data } = params;
	try {
		const response = await SERVER.post(url, {
			...data,
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const resetPassword = createAsyncThunk("resetPassword", async (params, thunkApi) => {
	const { url, data } = params;
	try {
		const response = await SERVER.post(url, {
			...data,
		});
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const logout = createAsyncThunk("logout", async (params, thunkApi) => {
	const { url } = params;
	try {
		const response = await SERVER.post(url);
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});
