import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link } from "react-router-dom";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { notificationList } from "redux/api/services/notificationService";
import { authEndPoints } from "helpers/endpoints";
import { getMe } from "redux/api/services/profileService";

const AdminHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const role = localStorage.getItem("roleName");
	const [getdata, setGetdata] = useState("");
	const logoutFn = () => {
		localStorage.removeItem("role");
		localStorage.removeItem("token");
		localStorage.removeItem("roleName");
		navigate("/");
		successAlert("Logged out successfully");
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const notificationData = useSelector((state) => state.notification.notificationList.data?.data);
	const employeeData = useSelector((state) => state.profile.getme.data?.data);


	// getme data
	// const gettingData = async () => {
	// 	const parameter = {
	// 		url: authEndPoints.profile.getme,
	// 	};
	// 	try {
	// 		const response = await dispatch(getMe(parameter)).unwrap();
	// 		setGetdata(response);
	// 	} catch (errors) {
	// 		errorAlert(errors?.error);
	// 	}
	// };

	const handleClose = () => {
		setAnchorEl(null);
	};

	const viewProfile = () => {
		navigate(`/${role}/myProfile`);
	};
	const fecthNotification = async () => {
		try {
			const parameters = {
				url: `${authEndPoints.notification.list}`,
			};
			await dispatch(notificationList(parameters)).unwrap();
		} catch (err) {
		}
	};
	useEffect(() => {
		fecthNotification();
	}, []);

	// useEffect(() => {
	// 	gettingData();
	// }, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" className="cg-header">
				<Toolbar>
					<IconButton
						style={{ backgroundColor: "#fffff" }}
						size="large"
						edge="start"
						// color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					></IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

					<Stack direction={"row"} gap={3} alignItems={"center"}>
						<Box>
							{role === "admin" && (
								<Badge badgeContent={notificationData?.total ?? 0} color="secondary" onClick={handleClick} sx={{ cursor: "pointer" }}>
									<NotificationsIcon sx={{ color: "black" }} />
								</Badge>
							)}
						</Box>
						<Avatar src={employeeData?.image} sx={{ width: "30px", height: "30px", cursor: "pointer" }} onClick={() => viewProfile()} />

						<IconButton onClick={logoutFn}>
							<LogoutIcon sx={{ color: "black" }} />
						</IconButton>
					</Stack>

					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<List sx={{ width: "100%", maxWidth: 360 }}>
							{notificationData?.data?.map((notification, index) => {
								return (
									<>
										{" "}
										{index <= 2 ? (
											<ListItem alignItems="flex-start" key={index}>
												<ListItemAvatar>
													<Avatar alt="Remy Sharp" src="" />
												</ListItemAvatar>
												<ListItemText
													primary={notification.title}
													secondary={<React.Fragment>{notification.message}</React.Fragment>}
												/>
											</ListItem>
										) : (
											index === 3 && (
												<ListItem components={Link} alignItems="flex-start">
													<ListItemText
														secondary={
															<Link
																to={`/${role}/notifications`}
																style={{
																	textDecoration: "unset",
																	color: "gray",
																}}
															>
																<Box sx={{ textAlign: "center", cursor: "pointer" }}>{"View All Notification"}</Box>
															</Link>
														}
													/>
												</ListItem>
											)
										)}
									</>
								);
							})}
						</List>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AdminHeader;
