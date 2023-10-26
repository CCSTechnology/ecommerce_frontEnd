/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Box, Container, Grid, Typography, Stack, Divider, TextField, TableContainer, Table, TableRow, TableCell, TableBody, MenuItem, IconButton } from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import React, { useEffect, useState } from "react";
import { CalenderIcon, ClockformIcon, LocationIcon } from "helpers/images";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authEndPoints } from "helpers/endpoints";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { jobVerifyData, updateStatusData, viewJobData } from "redux/api/services/jobService";
import TaskDetailsLoader from "components/TableLoader/taskDetailsLoader";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteModal from "components/deleteModal";

const TaskViewForm = () => {
	let { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [dataJob, setDataJob] = useState(null);
	const taskviewdata = useSelector((state) => state.job.viewJobData.data);
	const taskviewLoading = useSelector((state) => state.job.viewJobData.loading);
	const role = localStorage.getItem("roleName");
	console.log(taskviewdata?.sub);
	const [delid, setDelId] = useState(null)
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const viewJob = async () => {
		const parameters = {
			url: `${authEndPoints.job.viewJob(id)}`,
		};
		try {
			await dispatch(viewJobData(parameters)).unwrap();
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};
	const commaSeparatedOutput = taskviewdata?.is_day.join(', ');
	const deleteDirectory = (id) => {
		setDelId(id)
		setDeleteModalOpen(true);
	}

	const deleteDirectoryModalClose = () => {
		setDeleteModalOpen(false);
	}

	const delteApiFn = async () => {

		// const parameters = {
		// 	url: `${authEndPoints.directory.removeDirectory(delid)}`,
		// };
		// try {
		// 	const response = await dispatch(deleteDirectoryData(parameters)).unwrap();
		// 	// setDeleteModalOpen(false);
		// 	successAlert(response.message);
		// 	directoryListApi()
		// } catch (errors) {
		// 	errorAlert(errors?.error);

		// }
	}

	const jobData = (e) => {
		setDataJob(e.target.value);
	};

	const jobSubmit = async () => {
		const parameters = {
			url: `${authEndPoints.job.verifyJob(id)}`,
			remarks: dataJob,
		};
		try {
			const response = await dispatch(jobVerifyData(parameters)).unwrap();
			successAlert(response.message);
			navigate(`/${role}/tasks`);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

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

	useEffect(() => {
		viewJob();
	}, []);


	return (
		<Box sx={{ backgroundColor: "#ddf0dd" }} className="indexBox">
			<TopBreaccrumb title={taskviewdata?.name} to={`/${role}/tasks`} />
			<Grid container spacing={2} sx={{ my: 4 }} justifyContent="center" alignItems="center" className="task-view">
				{taskviewLoading ? (
					<TaskDetailsLoader />
				) : (
					<Grid
						item
						xs={12}
						sm={12}
						md={10}
						lg={10}
						sx={{
							backgroundColor: "#ffffff",
						}}
					>
						<Container>
							<Box id={"1"}>
								<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: "30px" }}>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											{" "}
											Date and Time
										</Typography>
										<Box spacing={2} className="taskview-one">
											<Stack direction="row" spacing={2} sx={{ p: 2 }}>
												<Box>
													<img src={CalenderIcon} />{" "}
												</Box>
												<Typography>{new Date(taskviewdata?.date).toLocaleDateString("en-GB")}</Typography>
											</Stack>
											<Divider variant="middle" className="taskform-divider" />
											<Stack direction="row" spacing={2} sx={{ p: 2 }}>
												<Box>
													<img src={ClockformIcon} />
												</Box>
												<Typography>{taskviewdata?.start_time}</Typography>
												<Typography>{taskviewdata?.end_time}</Typography>
											</Stack>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Address Details
										</Typography>
										<Stack direction="row" className="taskview-one">
											<Box sx={{ p: 1 }}>
												<img src={LocationIcon} />
											</Box>
											<Box sx={{ p: 1 }}>
												<Typography className="taskview-font">{taskviewdata?.city}</Typography>
												<Typography className="taskview-font">{taskviewdata?.address}</Typography>
											</Box>
										</Stack>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Job Type
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">{taskviewdata?.type === "recurring" ? "Task" : "Quick Job"}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Job
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">{taskviewdata?.name}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Day
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											
											<Typography className="taskview-font">{commaSeparatedOutput}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Task Type
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">{taskviewdata?.recurring_type}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Shift Details
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Box className="taskview-font">{taskviewdata?.shift_title}</Box>
										</Box>
									</Grid>

									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Chat Link
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">{taskviewdata?.chat_link ? taskviewdata?.chat_link : "-"}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Assigned to
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">{taskviewdata?.user_name}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Assigned by
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font"> {taskviewdata?.admin_name}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Status
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">{taskviewdata?.status}</Typography>
										</Box>
									</Grid>
									<Grid item sm={6} xs={12} md={6}>
										<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
											Amount
										</Typography>
										<Box className="taskview" sx={{ p: 2 }}>
											<Typography className="taskview-font">$ {taskviewdata?.amount}</Typography>
										</Box>
									</Grid>

									<Grid item xs={12} className="taskgrid">
										{taskviewdata?.sub.length === 0 ? "" : <TableContainer className="taskPageTable">
											<Table>
												<TableRow>
													<TableCell>Day</TableCell>
													<TableCell>Type</TableCell>
													<TableCell>Time</TableCell>
													{/* <TableCell>Location</TableCell> */}
													<TableCell>Assigned to</TableCell>
													<TableCell>Assigned by</TableCell>
													<TableCell>status</TableCell>
													{/* <TableCell>Actions</TableCell> */}
												</TableRow>
												<TableBody>
													{taskviewdata?.sub.map((item) => (
														< TableRow key={item.id} >
															{console.log(item)}
															<TableCell>{new Date(item.date).toLocaleDateString("en-GB")}</TableCell>
															<TableCell>{item.type === "recurring" ? "Task" : "Quick Job"}</TableCell>
															<TableCell>{item.start_time}</TableCell>
															{/* <TableCell>{item.address}</TableCell> */}
															<TableCell>{item.user_name}</TableCell>
															<TableCell>{item.admin_name}</TableCell>
															<TableCell>{item.type === "quick" ? <TextField
																id="outlined-select-currency"
																select
																// label="Select"
																size="small"
																sx={{
																	width: "100%",
																}}
																defaultValue={item.status}
																onChange={(e) => handleChangeTask(item.id, e)}
															>
																<MenuItem
																	value={"pending"}
																	disabled={
																		item.status === "completed" || item.status === "in progress" || item.status === "in review"
																			? true
																			: false
																	}
																>
																	Pending
																</MenuItem>
																<MenuItem value={"completed"}>Completed</MenuItem>
																<MenuItem
																	value={"in progress"}
																	disabled={item.status === "completed" || item.status === "in review" ? true : false}
																>
																	In Progress
																</MenuItem>
																<MenuItem
																	value={"in review"}
																	disabled={item.status === "in progress" || item.status === "pending" ? true : false}
																>
																	In Review
																</MenuItem>
															</TextField> :
																item.type === "recurring" ? <TextField

																	id="outlined-select-currency"
																	// InputProps={{
																	// 	readOnly: true,
																	// }}
																	select
																	// label="Select"
																	size="small"
																	sx={{
																		width: "100%",
																	}}
																	defaultValue={item.status}
																	onChange={(e) => handleChangeTask(item.id, e)}
																>
																	<MenuItem
																		value={"pending"}
																		disabled={
																			item.status === "completed" || item.status === "in progress" || item.status === "in review"
																				? true
																				: false
																		}
																	>
																		Pending
																	</MenuItem>
																	<MenuItem value={"completed"}>Completed</MenuItem>
																	<MenuItem
																		value={"in progress"}
																		disabled={item.status === "completed" || item.status === "in review" ? true : false}
																	>
																		In Progress
																	</MenuItem>
																	<MenuItem
																		value={"in review"}
																		disabled={item.status === "in progress" || item.status === "pending" ? true : false}
																	>
																		In Review
																	</MenuItem>
																</TextField> : ""}</TableCell>
															{/* <TableCell align="center">
																<Stack direction={'row'} gap={2}>
																	<EditIcon className="table-icons" />
																	<DeleteIcon className="table-icons"
																	/>

																</Stack>
															</TableCell> */}
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>}

									</Grid>

									{role === "admin" ?
										(
											<Grid container xs={12} justifyContent="flex-end" sx={{ pt: 3 }}>
												{/* <Button variant="contained" onClick={() => deleteDirectory()} sx={{ backgroundColor: "#da8e8e" }}>
														Job Completed
													</Button> */}
											</Grid>
										)
										: role === "supervisor" && taskviewdata?.status === "completed" && taskviewdata?.is_verfied === 0 ? (
											<>
												<Grid item xs={12}>
													<Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
														Remarks
													</Typography>
													<Box>
														<TextField
															id="outlined-basic"
															label=""
															variant="outlined"
															fullWidth
															onChange={(e) => jobData(e)}
														/>
													</Box>
												</Grid>
												<Grid xs={12} container justifyContent="flex-end" sx={{ pt: 2, pb: 2, height: "20px" }} size="small">
													<LoadingButton
														loadingPosition="center"
														loading={taskviewLoading}
														variant="contained"
														type="submit"
														className="submitBtnn"
														onClick={() => jobSubmit()}
													>
														Submit
													</LoadingButton>
												</Grid>
											</>
										) : (
											""
										)}
								</Grid>
							</Box>
						</Container>
					</Grid>
				)}

				{deleteModalOpen &&
					<DeleteModal open={deleteModalOpen} close={() => deleteDirectoryModalClose()}
						title={'Delete Job'}
						content={'Are you sure want to delete this Job?'}
						submit={delteApiFn}
					// loading={stateValues.deleteLoading}
					/>
				}
			</Grid>
		</Box >
	);
};

export default TaskViewForm;
