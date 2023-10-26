import { createSlice } from "@reduxjs/toolkit"
import { directoryList, addDirectoryData, deleteDirectoryData, viewDirectoryData } from "redux/api/services/directoryService"

const initialState = {
    directoryList: {
        loading: false,
        data: [],
        error: null,
    },
    addDirectory: {
        loading: false,
        data: null,
        error: null,
    },
    deleteDirectory: {
        loading: false,
        data: null,
        error: null,
    },
    // editDirectory: {
    //     loading: false,
    //     data: null,
    //     error: null,
    // },
    viewDirectory: {
        loading: false,
        data: null,
        error: null,
    }
}

export const directorySlice = createSlice({
    name: "directory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get me
            .addCase(directoryList.pending, (state, action) => {
                state.directoryList.loading = true;
            })
            .addCase(directoryList.fulfilled, (state, action) => {
                state.directoryList.loading = false;
                state.directoryList.data = action.payload;
                state.directoryList.error = null;
            })
            .addCase(directoryList.rejected, (state, action) => {
                state.directoryList.loading = false;
                state.directoryList.error = action.payload;
            })
            //Add Directory
            .addCase(addDirectoryData.pending, (state, action) => {
                state.addDirectory.loading = true;
            })
            .addCase(addDirectoryData.fulfilled, (state, action) => {
                state.addDirectory.loading = false;
                state.addDirectory.data = action.payload;
                state.addDirectory.error = null;
            })
            .addCase(addDirectoryData.rejected, (state, action) => {
                state.addDirectory.loading = false;
                state.addDirectory.error = action.payload;
            })
            //Delete Directory
            .addCase(deleteDirectoryData.pending, (state, action) => {
                state.deleteDirectory.loading = true;
            })
            .addCase(deleteDirectoryData.fulfilled, (state, action) => {
                state.deleteDirectory.loading = false;
                state.deleteDirectory.data = action.payload;
                state.deleteDirectory.error = null;
            })
            .addCase(deleteDirectoryData.rejected, (state, action) => {
                state.deleteDirectory.loading = false;
                state.deleteDirectory.error = action.payload;
            })
            //Edit Directory
            // .addCase(editDirectoryData.pending, (state, action) => {
            //     state.editDirectory.loading = true;
            // })
            // .addCase(editDirectoryData.fulfilled, (state, action) => {
            //     state.editDirectory.loading = false;
            //     state.editDirectory.data = action.payload;
            //     state.editDirectory.error = null;
            // })
            // .addCase(editDirectoryData.rejected, (state, action) => {
            //     state.editDirectory.loading = false;
            //     state.editDirectory.error = action.payload;
            // })
            //view Directory
            .addCase(viewDirectoryData.pending, (state, action) => {
                state.viewDirectory.loading = true;
            })
            .addCase(viewDirectoryData.fulfilled, (state, action) => {
                state.viewDirectory.loading = false;
                state.viewDirectory.data = action.payload;
                state.viewDirectory.error = null;
            })
            .addCase(viewDirectoryData.rejected, (state, action) => {
                state.viewDire.loading = false;
                state.viewDire.error = action.payload;
            })
    },

})

export default directorySlice.reducer