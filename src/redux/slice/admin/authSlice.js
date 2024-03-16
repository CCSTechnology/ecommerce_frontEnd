import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  // authRegister,
  // forgetPassword,
  logout,
  // resetPassword,notificationView
  notificationViewData,
  notificationUpdateData,
} from "../../../redux/api/admin/authService";

const initialState = {
  login: {
    loading: false,
    data: null,
    error: null,
  },

  logout: {
    loading: false,
    data: null,
    error: null,
  },
  notificationView: {
    loading: false,
    data: null,
    error: null,
  },

  notificationUpdate: {
    loading: false,
    data: null,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder
      //Auth login
      .addCase(authLogin.pending, (state, action) => {
        state.login.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload;
        state.login.error = null;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })

      //Logout
      .addCase(logout.pending, (state, action) => {
        state.logout.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout.loading = false;
        state.logout.data = action.payload;
        state.logout.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.loading = false;
        state.logout.error = action.payload;
      })

      .addCase(notificationViewData.pending, (state, action) => {
        state.notificationView.loading = true;
      })
      .addCase(notificationViewData.fulfilled, (state, action) => {
        state.notificationView.loading = false;
        state.notificationView.data = action.payload;
        state.notificationView.error = null;
      })
      .addCase(notificationViewData.rejected, (state, action) => {
        state.notificationView.loading = false;
        state.notificationView.error = action.payload;
      })

      .addCase(notificationUpdateData.pending, (state, action) => {
        state.notificationUpdate.loading = true;
      })
      .addCase(notificationUpdateData.fulfilled, (state, action) => {
        state.notificationUpdate.loading = false;
        state.notificationUpdate.data = action.payload;
        state.notificationUpdate.error = null;
      })
      .addCase(notificationUpdateData.rejected, (state, action) => {
        state.notificationUpdate.loading = false;
        state.notificationUpdate.error = action.payload;
      });
  },
});

export default authSlice.reducer;
