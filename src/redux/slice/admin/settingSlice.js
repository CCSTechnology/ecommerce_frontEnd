import { createSlice } from "@reduxjs/toolkit";
import {
  settingImageView,
  settingImageAdd,
  settingImageDelete,
  settingImageEdit,
  settingImageData,
} from "../../../redux/api/admin/settingService";

const settingCases = [
  {
    api: settingImageView,
    name: "settingImageView",
  },
  {
    api: settingImageAdd,
    name: "settingImageAdd",
  },
  {
    api: settingImageDelete,
    name: "settingImageDelete",
  },
  {
    api: settingImageEdit,
    name: "settingImageEdit",
  },
  {
    api: settingImageData,
    name: "settingImageData",
  },
];

const initialState = {};

settingCases.forEach((cases) => {
  initialState[cases.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    settingCases.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          state[cases.name].loading = true;
          state[cases.name].error = null;
          state[cases.name].data = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
        });
    });
  },
});

export default settingSlice.reducer;
