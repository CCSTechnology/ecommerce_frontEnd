import { createSlice } from "@reduxjs/toolkit"
import { approvedChangeData } from "redux/api/services/essentialService"

const initialState = {
    approvedChange: {
        loading: false,
        data: [],
        error: null,
    },
}

export const essentialSlice = createSlice({
    name: "essential",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get me
            .addCase(approvedChangeData.pending, (state, action) => {
                state.approvedChange.loading = true;
            })
            .addCase(approvedChangeData.fulfilled, (state, action) => {
                state.approvedChange.loading = false;
                state.approvedChange.data = action.payload;
                state.approvedChange.error = null;
            })
            .addCase(approvedChangeData.rejected, (state, action) => {
                state.approvedChange.loading = false;
                state.approvedChange.error = action.payload;
            })
    }
})

export default essentialSlice.reducer