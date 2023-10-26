import React, { Fragment, useEffect, useState } from "react";
import {
	Box,
	Stack,
	Button,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Drawer,
	InputLabel,
	IconButton,
	MenuItem,
	FormControl,
	Select,
	Typography,
	TextField,
} from "@mui/material";

import TopBreaccrumb from "components/TopBreadcrumb";
import { useDebounce } from "use-debounce";
import SearchInput from "components/searchInput";
import TableHeader from "./tableHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TablePagination from "components/Pagination";
import "./style.css";
import DrawerFormTaskList from "./drawerForm";
import { deleteJobData, jobList, updateStatusData } from "redux/api/services/jobService";
import { useDispatch, useSelector } from "react-redux";
import { authEndPoints } from "helpers/endpoints";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import TableRowsLoader from "components/TableLoader";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "components/deleteModal";
import dayjs from "dayjs";

const intialData = {
	open: false,
	type: "add",
	taskId: null,
};

const Tasks = () => {
	let { id } = useParams();
	const [searchKey, setSearchKey] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchValue] = useDebounce(searchKey, 1000);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [drawerType, setDrawerType] = useState(intialData);
	const [page, setPage] = useState(1);
	const [jobStatus, setJobStatus] = useState(null);
	const role = localStorage.getItem("roleName");
	const [delid, setDelId] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [filter, setFilter] = useState("");
	const [filterJob, setFilterJob] = useState("")
	const [jobUpdate, setJobUpdate] = useState(null)
	const jobListData = useSelector((state) => state.job.jobList);
	const taskDeleteLoading = useSelector((state) => state.job.deleteJobData.loading);

	const handleChangeTask = async (taskid, e) => {
		const parameters = {
			url: `${authEndPoints.job.statusUpdate(taskid)}`,
			status: e.target.value,
		};
		try {
			const response = await dispatch(updateStatusData(parameters)).unwrap();
			successAlert(response.message);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};



	// cancel search
	const cancelSearch = () => {
		setSearchKey("");
	};

	//pagination

	const handlePageChanges = (_event, pageValue) => {
		setPage(pageValue);
	};
	const handleRefetch = (_event, pageValue) => {
		jobListAPi();
		setDrawerType(intialData);
	};

	//on search
	const onSearch = (e) => {
		setSearchKey(e.target.value);
	};

	// close drawer
	const closeDrawer = () => {
		setDrawerType(intialData);
		// setOpenDrawer(false);
	};

	//list api
	const jobListAPi = async () => {
		const parameters = {
			url: `${authEndPoints.job.jobList}`,
			page: page,
			per_page: 10,
			search: searchKey,
			status: jobStatus,
			job_type: jobUpdate,
		};
		try {
			await dispatch(jobList(parameters)).unwrap();
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const addTask = () => {
		setDrawerType({
			taskId: null,
			type: "add",
			open: true,
		});
	};

	// delete task
	const deleteTask = (id) => {
		setDelId(id);
		setDeleteModalOpen(true);
	};

	const deleteDirectoryModalClose = () => {
		setDeleteModalOpen(false);
	};

	const delteApiFn = async () => {
		const parameters = {
			url: `${authEndPoints.job.deleteJob(delid)}`,
		};
		try {
			const response = await dispatch(deleteJobData(parameters)).unwrap();
			setDeleteModalOpen(false);
			successAlert(response.message);
			jobListAPi();
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const handleChange = (event) => {
		setFilter(event.target.value);
		setJobStatus(event.target.value);
	};

	const handleTask = (event) => {
		setFilterJob(event.target.value);
		setJobUpdate(event.target.value);
	};

	useEffect(() => {
		jobListAPi();
	}, [page, searchValue, jobStatus, jobUpdate]);

	return (
		<Box className="indexBox">
			<TopBreaccrumb title={"Task"} to={`/${role}/dashboard`} />
			<Box sx={{ my: 3 }}>
				<Stack direction={{ lg: "row", sm: "column" }} gap={2} alignItems={"center"} justifyContent={"space-between"}>
					<Stack direction={{ lg: "row", sm: "column" }} gap={2} alignItems={"center"}>
						<SearchInput
							sx={{
								border: "1px solid #303067",
								borderRadius: "20px",
								height: "32.69px",
								"&.Mui-focused ": {
									border: "1px solid #6473ff",
								},
								width: { xs: "100%", sm: "340px" },
							}}
							value={searchKey || ""}
							onChange={(e) => onSearch(e)}
							cancelSearch={cancelSearch}
						/>

						<Box>
							{role === "admin" && (
								<Button className="AddBtn" onClick={addTask}>
									Add
								</Button>
							)}
						</Box>
					</Stack>
					<Stack justifyContent="flex-end" direction={{ lg: "row", sm: "column" }}>
						<Box>
							<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
								<InputLabel id="demo-simple-select-helper-label">All</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									value={filterJob}
									label="Filter"
									onChange={handleTask}
								>
									<MenuItem value={""}>All</MenuItem>
									<MenuItem value={"recurring"}>Task</MenuItem>
									<MenuItem value={"quick"}>Quick Job</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<Box >
							<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
								<InputLabel id="demo-simple-select-helper-label">All</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									value={filter}
									label="Filter"
									onChange={handleChange}
								>
									<MenuItem value={""}>All</MenuItem>
									<MenuItem value={"pending"}>Assigned</MenuItem>
									<MenuItem value={"completed"}>Completed</MenuItem>
									<MenuItem value={"in progress"}>InProgress</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Stack>
				</Stack>
			</Box>
			<TableContainer className="rolesPageTable" id="sas">
				<Table>
					<TableHeader />
					<TableBody>
						{jobListData.loading ? (
							<TableRowsLoader rowsNum={10} colsNum={9} />
						) : (
							jobListData?.data?.data?.data.map((row, i) => (
								<TableRow key={row.id}>
									<TableCell>
										{dayjs(row.date).format("DD/MM/YYYY")}
									</TableCell>
									<TableCell>{row.type === "recurring" ? "Task" : "Quick Job"}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.address}</TableCell>
									<TableCell>{row.user_name}</TableCell>
									<TableCell>{row.admin_name}</TableCell>
									<TableCell>
										{row.type === "quick" ? <TextField
											id="outlined-select-currency"
											select
											// label="Select"
											size="small"
											sx={{
												width: "100%",
											}}
											defaultValue={row.status}
											onChange={(e) => handleChangeTask(row.id, e)}
										>
											<MenuItem
												value={"pending"}
												disabled={
													row.status === "completed" || row.status === "in progress" || row.status === "in review"
														? true
														: false
												}
											>
												Pending
											</MenuItem>
											<MenuItem value={"completed"}>Completed</MenuItem>
											<MenuItem
												value={"in progress"}
												disabled={row.status === "completed" || row.status === "in review" ? true : false}
											>
												In Progress
											</MenuItem>
											<MenuItem
												value={"in review"}
												disabled={row.status === "in progress" || row.status === "pending" ? true : false}
											>
												In Review
											</MenuItem>
										</TextField> :
											row.type === "recurring" &&
											row.status
										}

									</TableCell>
									<TableCell align="center">
										<Stack direction={"row"} gap={2}>
											<IconButton
												onClick={() => {
													navigate(`/${role}/tasks/${row.id}`);
												}}
											>
												<RemoveRedEyeIcon className="table-icons" sx={{ color: "black" }} />
											</IconButton>
											{role === "admin" && (
												<IconButton
													onClick={() => {
														setDrawerType({
															type: "edit",
															taskId: row.id,
															open: true,
														});
														// setOpenDrawer(true);
													}}
												>
													<EditIcon className="table-icons" sx={{ color: "black" }} />
												</IconButton>
											)}

											{role === "admin" && (
												<IconButton onClick={() => deleteTask(row.id)}>
													<DeleteIcon className="table-icons" sx={{ color: "black" }} />
												</IconButton>
											)}

										</Stack>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{jobListData?.data?.data?.data.length === 0 ? (
				<Box sx={{ my: 2 }}>
					<Typography>No Data Found</Typography>
				</Box>
			) : (
				<TablePagination totalRecords={jobListData?.data?.data?.total} handlePageChanges={handlePageChanges} page={page} />
			)}
			{drawerType.open && (
				<Drawer className="taskListDrawer" anchor={"right"} open={drawerType.open} onClose={closeDrawer}>
					<DrawerFormTaskList
					onClose={closeDrawer}
						handleRefetch={handleRefetch}
						type={drawerType.type}
						taskId={drawerType.taskId}
						defaultValues={{
							date: dayjs(),
						}}
					/>
				</Drawer>
			)}

			{deleteModalOpen && (
				<DeleteModal       
					open={deleteModalOpen}
					close={() => deleteDirectoryModalClose()}
					title={"Delete Employee"}
					content={"Are you sure want to delete this task?"}
					submit={delteApiFn}
					loading={taskDeleteLoading}
				/>
			)}
		</Box>
	);
};

export default Tasks;
