import { createSlice } from "@reduxjs/toolkit"
import { essentialList } from "redux/api/services/essentialService"

const initialState = {
    essentialList: {
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
            .addCase(essentialList.pending, (state, action) => {
                state.essentialList.loading = true;
            })
            .addCase(essentialList.fulfilled, (state, action) => {
                state.essentialList.loading = false;
                state.essentialList.data = action.payload;
                state.essentialList.error = null;
            })
            .addCase(essentialList.rejected, (state, action) => {
                state.essentialList.loading = false;
                state.essentialList.error = action.payload;
            })
    }
})

export default essentialSlice.reducer