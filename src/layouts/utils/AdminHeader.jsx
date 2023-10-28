import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";
import { successAlert } from "../../helpers/globalFunctions";



const AdminHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const role = localStorage.getItem("roleName");
	const [getdata, setGetdata] = useState("");
	const logoutFn = () => {
		localStorage.removeItem("role");
		localStorage.removeItem("token");
		localStorage.removeItem("roleName");
		navigate("/admin");
		successAlert("Logged out successfully");
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	


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

	// const viewProfile = () => {
	// 	navigate(`/${role}/myProfile`);
	// };


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
							
								<Badge badgeContent="0" color="secondary" onClick={handleClick} sx={{ cursor: "pointer" }}>
									<NotificationsIcon sx={{ color: "black" }} />
								</Badge>
						
						</Box>
						<Avatar src="" sx={{ width: "30px", height: "30px", cursor: "pointer" }}  />

						<IconButton onClick={logoutFn}>
							<LogoutIcon sx={{ color: "black" }} />
						</IconButton>
					</Stack>

				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AdminHeader;
