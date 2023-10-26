/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Stack, Button, Dialog, IconButton, Card, Typography, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import TopBreaccrumb from "components/TopBreadcrumb";
import SearchInput from "components/searchInput";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import AddNotificationForm from "./addNotificationform";
import { errorAlert } from "helpers/globalFunctions";
import "./style.css";
import { notificationList } from "redux/api/services/notificationService";
import { authEndPoints } from "helpers/endpoints";
import NotificationCardLoader from "components/TableLoader/NotificationCardLoader";
import CardPagination from "components/Pagination/cardPagination";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function Notifications() {

	const navigate = useNavigate()
	const [open, setOpen] = React.useState(false);
	const [searchKey, setSearchKey] = useState(null);
	const [singleData, setSingleData] = useState(null);
	const [searchValue] = useDebounce(searchKey, 1000);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const role = localStorage.getItem("roleName");
	const notificationListData = useSelector((state) => state.notification.notificationList);


	// cancel search
	const cancelSearch = () => {
		setSearchKey("");
	};

	//on search
	const onSearch = (e) => {
		setSearchKey(e.target.value);
	};

	//list api
	const notificationListApi = async () => {
		const parameters = {
			url: `${authEndPoints.notification.list}`,
			search: searchKey,
			page: page,
			per_page: 10,
		};
		try {
			await dispatch(notificationList(parameters)).unwrap();
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleButtonClick = async () => {
		handleClose(); // Call handleClose to close the form
	};

	const handleClickOpen = () => {
		setSingleData(null);
		setOpen(true);
	};

	//pagination
	const handlePageChanges = (_event, pageValue) => {
		setPage(pageValue);
	};

	const handleNotification = (type, typeid, e) => {

		if (type === "user") {
			navigate(`/admin/employees/${typeid}`)
		}
		else if (type === "job") {
			navigate(`/admin/tasks/${typeid}`)
		}
		else {
			navigate(`/admin/invoiceView/${typeid}`)
		}
	}
	useEffect(() => {
		notificationListApi();
	}, [searchValue, page]);

	return (
		<Box className="indexBox">
			<TopBreaccrumb title={"Notifications"} to={`/${role}/dashboard`} />
			<Box sx={{ my: 3 }}>
				<Stack direction={{ lg: "row", sm: "column" }} gap={2} alignItems={"center"}>
					<Box>
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
					</Box>
					<Box>
						{role === "admin" && (
							<Button className="AddBtn" onClick={handleClickOpen}>
								Add Notifications
							</Button>
						)}
					</Box>
				</Stack>
			</Box>
			<Box className="notificationCtr" >
				{notificationListData?.loading ? (
					<NotificationCardLoader count={10} />
				) : (
					notificationListData?.data?.data?.data?.map((row, i) => (
						<Card
							sx={{
								border: "1px solid #049457",
								borderRadius: "8px",
								padding: 1.5,
								mb: 1,
							}}
							variant="outlined"

						>
							<Grid key={i} container spacing={2} onClick={() => handleNotification(row.type, row.type_id)}
								sx={{ cursor: 'pointer' }}>
								<Grid item xs={12} sm={2} md={2} lg={3} >
									<Typography sx={{ fontSize: "14px", textTransform: 'capitalize' }}>{row.title ? row.title : "Title"}</Typography>
								</Grid>
								<Grid item xs={12} sm={5} md={6} lg={7}>
									<Typography sx={{ fontSize: "14px" }}>{row.message ? row.message : "Message"}</Typography>
								</Grid>
								<Grid item xs={12} sm={3} md={2} lg={1}>
									<Typography sx={{ fontSize: "14px" }}>{new Date(row.created_at).toLocaleDateString("en-GB")}</Typography>
								</Grid>
								<Grid item xs={12} sm={2} md={2} lg={1}>
									<Typography sx={{ fontSize: "14px" }}>
										{new Date(row.updated_at).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</Typography>
								</Grid>
							</Grid>
						</Card>
					))
				)}
			</Box>

			{notificationListData?.data?.data?.data?.length === 0 ? (
				<Box sx={{ my: 2 }}>
					<Typography>No Data Found</Typography>
				</Box>
			) : (
				<CardPagination totalRecords={notificationListData?.data?.data?.total} handlePageChanges={handlePageChanges} page={page} />
			)}

			{open === true ? (
				<Dialog
					fullWidth={true}
					maxWidth={"sm"}
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle>
						<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
							<Box> {singleData ? null : "Add Notification"}</Box>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</Stack>
					</DialogTitle>

					{singleData ? (
						<AddNotificationForm onClick={handleButtonClick} initialData={singleData} />
					) : (
						<AddNotificationForm onClick={handleButtonClick} />
					)}
				</Dialog>
			) : null}
		</Box>
	);
}

export default Notifications;
