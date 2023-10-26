import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import './style.css';
import DashboardBox from "./dashboardBox";
import CompleteTaskTable from "./completeTaskTable";
import { dashboardListTable } from "redux/api/services/dashboardService";
import { errorAlert } from "helpers/globalFunctions";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import InProgressTaskTable from "./inprogressTaskTable";
import UpComingTaskTable from "./upcomingobsTaskTable";

const Dashboard = () => {

	const dispatch = useDispatch()
	const roleName = localStorage.getItem("roleName");

	const completedData = useSelector((state) => state.dashboard.dashboardList.data.data)
	const loadingTable = useSelector((state) => state.dashboard.dashboardList.loading)


	// const dashboardListTabledata = async () => {
	// 	const parameters = {
	// 		url: `${authEndPoints.dashboard.dashboardTable}`
	// 	};
	// 	try {
	// 		await dispatch(dashboardListTable(parameters)).unwrap();

	// 	} catch (errors) {
	// 		errorAlert(errors?.error);
	// 	}
	// };

	// useEffect(() => {
	// 	dashboardListTabledata()
	// }, [])

	return (
		<Box sx={{ my: 13, mx: 12 }} className='formFullCtr'>
		
				<DashboardBox />
			
			<Box sx={{ my: 5 }}>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<CompleteTaskTable tableData={completedData} loading={loadingTable} />
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<InProgressTaskTable tableData={completedData} loading={loadingTable} />
					</Grid>
				</Grid>
			</Box>
			<Grid xs={12} sm={12} md={12} lg={12}>
				<UpComingTaskTable tableData={completedData} loading={loadingTable} />
			</Grid>

		</Box>
	);
};

export default Dashboard;
