import React, { useEffect, useState, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";
import { successAlert } from "../../helpers/globalFunctions";
import {
  notificationUpdateData,
  notificationViewData,
} from "../../redux/api/admin/authService";
import { authEndPoints } from "../../helpers/endpoints";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("roleName");
  const [getdata, setGetdata] = useState("");
  console.log(getdata);
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
  const notificationData = async () => {
    const parameter = {
      url: authEndPoints.admin.viewNotify,
    };
    try {
      const response = await dispatch(notificationViewData(parameter)).unwrap();
      setGetdata(response);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotification = async (id) => {
    const parameters = {
      id: id,
    };
    try {
      const res = await dispatch(notificationUpdateData(parameters)).unwrap();
      //   navigate(`admin/orders/${id}`);
      console.log(res);
      handleClose();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  // const viewProfile = () => {
  // 	navigate(`/${role}/myProfile`);
  // };

  useEffect(() => {
    notificationData();
  }, []);

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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <Stack direction={"row"} gap={3} alignItems={"center"}>
            <Box>
              <Badge
                badgeContent="0"
                color="secondary"
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
              >
                <NotificationsIcon sx={{ color: "black" }} />
              </Badge>
            </Box>
            <Avatar
              src=""
              sx={{ width: "30px", height: "30px", cursor: "pointer" }}
            />

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
              {getdata?.data?.length === 0 ? (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    secondary={<React.Fragment>No Notification</React.Fragment>}
                  />
                </ListItem>
              ) : (
                getdata?.data?.map((notification, index) => {
                  return (
                    <Fragment>
                      {/* {index <= 2 ? ( */}
                      <ListItem
                        alignItems="flex-start"
                        //   key={index}
                        onClick={() => {
                          handleNotification(notification.id);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={notification.id}
                          secondary={
                            <React.Fragment>
                              {notification.description}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {/* ) : null} */}

                      {index === getdata?.data?.length - 1 ? (
                        <ListItem
                          components={Link}
                          alignItems="flex-start"
                          onClick={() => {}}
                        >
                          <ListItemText
                            secondary={
                              <Box
                                sx={{ textAlign: "center", cursor: "pointer" }}
                              >
                                {"View All Notification"}
                              </Box>
                              // </Link>
                            }
                          />
                        </ListItem>
                      ) : null}
                    </Fragment>
                  );
                })
              )}
            </List>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminHeader;
