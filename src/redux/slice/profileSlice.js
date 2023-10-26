import { createSlice } from "@reduxjs/toolkit"
import { getMe, updateMeData, changePassword } from "redux/api/services/profileService"

const initialState = {
    getme: {
        loading: false,
        data: null,
        error: null,
    },
    updateMe: {
        loading: false,
        data: null,
        error: null,
    },
    changepassword: {
        loading: false,
        data: null,
        error: null,
    },
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get me
            .addCase(getMe.pending, (state, action) => {
                state.getme.loading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.getme.loading = false;
                state.getme.data = action.payload;
                state.getme.error = null;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.getme.loading = false;
                state.getme.error = action.payload;
            })
            //Update me
            .addCase(updateMeData.pending, (state, action) => {
                state.updateMe.loading = true;
            })
            .addCase(updateMeData.fulfilled, (state, action) => {
                state.updateMe.loading = false;
                state.updateMe.data = action.payload;
                state.updateMe.error = null;
            })
            .addCase(updateMeData.rejected, (state, action) => {
                state.updateMe.loading = false;
                state.updateMe.error = action.payload;
            })

            // change password
            .addCase(changePassword.pending, (state, action) => {
                state.changepassword.loading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.changepassword.loading = false;
                state.changepassword.data = action.payload;
                state.changepassword.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changepassword.loading = false;
                state.changepassword.error = action.payload;
            });
    }
})

export default profileSlice.reducer
