import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";



export const publicAuthLogin = createAsyncThunk("authLogin", async (params, thunkApi) => {
	const { url = "", data = {} } = params;
	try {
		const response = await PUBLICSERVER.post("/auth/login", {
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





export const PublicAuthlogout = createAsyncThunk("PublicAuthlogout", async (params, thunkApi) => {
	const { url } = params;
	try {
		const response = await PUBLICSERVER.post(url);
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

