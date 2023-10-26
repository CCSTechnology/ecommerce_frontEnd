import { createSlice } from "@reduxjs/toolkit"
import { notificationList, addNotification } from "redux/api/services/notificationService"

const initialState = {
    notificationList: {
        loading: false,
        data: [],
        error: null,
    },
    addNotification: {
        loading: false,
        data: null,
        error: null,
    }
}

export const directorySlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //notification list
            .addCase(notificationList.pending, (state, action) => {
                state.notificationList.loading = true;
            })
            .addCase(notificationList.fulfilled, (state, action) => {
                state.notificationList.loading = false;
                state.notificationList.data = action.payload;
                state.notificationList.error = null;
            })
            .addCase(notificationList.rejected, (state, action) => {
                state.notificationList.loading = false;
                state.notificationList.error = action.payload;
            })
            //add notification
            .addCase(addNotification.pending, (state, action) => {
                state.addNotification.loading = true;
            })
            .addCase(addNotification.fulfilled, (state, action) => {
                state.addNotification.loading = false;
                state.addNotification.data = action.payload;
                state.addNotification.error = null;
            })
            .addCase(addNotification.rejected, (state, action) => {
                state.addNotification.loading = false;
                state.addNotification.error = action.payload;
            })
    },

})

export default directorySlice.reducer