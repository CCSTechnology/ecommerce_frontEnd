import { createSlice } from "@reduxjs/toolkit";
import { dashboardListDatas } from "../../../redux/api/admin/dashboardService";

const initialState = {
  dashboardList: {
    loading: false,
    data: [],
    error: null,
  },
};

export const dashboardSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get me
      .addCase(dashboardListDatas.pending, (state, action) => {
        state.dashboardList.loading = true;
      })
      .addCase(dashboardListDatas.fulfilled, (state, action) => {
        state.dashboardList.loading = false;
        state.dashboardList.data = action.payload;
        state.dashboardList.error = null;
      })
      .addCase(dashboardListDatas.rejected, (state, action) => {
        state.dashboardList.loading = false;
        state.dashboardList.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
