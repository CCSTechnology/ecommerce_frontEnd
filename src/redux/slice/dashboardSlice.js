import { createSlice } from "@reduxjs/toolkit";
import { dashboardListTable } from "redux/api/services/dashboardService";


const initialState = {
    dashboardList: {
        loading: false,
        data: [],
        error: null,
    },
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get job
            .addCase(dashboardListTable.pending, (state, action) => {
                state.dashboardList.loading = true;
            })
            .addCase(dashboardListTable.fulfilled, (state, action) => {
                state.dashboardList.loading = false;
                state.dashboardList.data = action.payload;
                state.dashboardList.error = null;
            })
            .addCase(dashboardListTable.rejected, (state, action) => {
                state.dashboardList.loading = false;
                state.dashboardList.error = action.payload;
            });
    },
});
export default dashboardSlice.reducer;