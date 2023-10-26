import { createSlice } from "@reduxjs/toolkit";
import { jobList, addJobData, deleteJobData, viewJobData, jobCalenderList, jobVerifyData, updateStatusData, deleteTaskviewJobData } from "redux/api/services/jobService";

const initialState = {
	jobList: {
		loading: false,
		data: [],
		error: null,
	},
	addJobData: {
		loading: false,
		data: null,
		error: null,
	},
	deleteJobData: {
		loading: false,
		data: null,
		error: null,
	},
	viewJobData: {
		loading: false,
		data: null,
		error: null,
	},
	jobCalenderList: {
		loading: false,
		data: null,
		error: null,
	},
	jobVerify: {
		loading: false,
		data: null,
		error: null,
	},
	updateStatus: {
		loading: false,
		data: null,
		error: null,
	},

	deleteTaskviewJob: {
		loading: false,
		data: null,
		error: null
	}
};

export const directorySlice = createSlice({
	name: "job",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//job calender list
			.addCase(jobCalenderList.pending, (state, action) => {
				state.jobCalenderList.loading = true;
			})
			.addCase(jobCalenderList.fulfilled, (state, action) => {
				state.jobCalenderList.loading = false;
				state.jobCalenderList.data = action.payload;
				state.jobCalenderList.error = null;
			})
			.addCase(jobCalenderList.rejected, (state, action) => {
				state.jobCalenderList.loading = false;
				state.jobCalenderList.error = action.payload;
			})
			//job list
			.addCase(jobList.pending, (state, action) => {
				state.jobList.loading = true;
			})
			.addCase(jobList.fulfilled, (state, action) => {
				state.jobList.loading = false;
				state.jobList.data = action.payload;
				state.jobList.error = null;
			})
			.addCase(jobList.rejected, (state, action) => {
				state.jobList.loading = false;
				state.jobList.error = action.payload;
			})
			//add job
			.addCase(addJobData.pending, (state, action) => {
				state.addJobData.loading = true;
			})
			.addCase(addJobData.fulfilled, (state, action) => {
				state.addJobData.loading = false;
				state.addJobData.data = action.payload;
				state.addJobData.error = null;
			})
			.addCase(addJobData.rejected, (state, action) => {
				state.addJobData.loading = false;
				state.addJobData.error = action.payload;
			})
			//Delete job
			.addCase(deleteJobData.pending, (state, action) => {
				state.deleteJobData.loading = true;
			})
			.addCase(deleteJobData.fulfilled, (state, action) => {
				state.deleteJobData.loading = false;
				state.deleteJobData.data = action.payload;
				state.deleteJobData.error = null;
			})
			.addCase(deleteJobData.rejected, (state, action) => {
				state.deleteJobData.loading = false;
				state.deleteJobData.error = action.payload;
			})
			//view Directory
			.addCase(viewJobData.pending, (state) => {
				state.viewJobData.loading = true;
				state.viewJobData.data = null;
			})
			.addCase(viewJobData.fulfilled, (state, action) => {
				state.viewJobData.loading = false;
				state.viewJobData.data = action.payload.data;
				state.viewJobData.error = null;
			})
			.addCase(viewJobData.rejected, (state, action) => {
				state.viewJobData.loading = false;
				state.viewJobData.error = action.payload;
			})

			//job verify
			.addCase(jobVerifyData.pending, (state, action) => {
				state.jobVerify.loading = true;
			})
			.addCase(jobVerifyData.fulfilled, (state, action) => {
				state.jobVerify.loading = false;
				state.jobVerify.data = action.payload;
				state.jobVerify.error = null;
			})
			.addCase(jobVerifyData.rejected, (state, action) => {
				state.jobVerify.loading = false;
				state.jobVerify.error = action.payload;
			})

			//update status
			.addCase(updateStatusData.pending, (state) => {
				state.updateStatus.loading = true;
				state.updateStatus.data = null;
			})
			.addCase(updateStatusData.fulfilled, (state, action) => {
				state.updateStatus.loading = false;
				state.updateStatus.data = action.payload.data;
				state.updateStatus.error = null;
			})
			.addCase(updateStatusData.rejected, (state, action) => {
				state.updateStatus.loading = false;
				state.updateStatus.error = action.payload;
			})

			//delete taskview job
			.addCase(deleteTaskviewJobData.pending, (state) => {
				state.deleteTaskviewJob.loading = true;
				state.deleteTaskviewJob.data = null;
			})
			.addCase(deleteTaskviewJobData.fulfilled, (state, action) => {
				state.deleteTaskviewJob.loading = false;
				state.deleteTaskviewJob.data = action.payload.data;
				state.deleteTaskviewJob.error = null;
			})
			.addCase(deleteTaskviewJobData.rejected, (state, action) => {
				state.deleteTaskviewJob.loading = false;
				state.deleteTaskviewJob.error = action.payload;
			})
	},
});

export default directorySlice.reducer;
