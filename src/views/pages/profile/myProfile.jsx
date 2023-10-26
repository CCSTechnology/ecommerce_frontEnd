/* eslint-disable react-hooks/exhaustive-deps */
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Stack
} from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch } from "react-redux";
import { getMe } from "redux/api/services/profileService";
import { errorAlert } from "helpers/globalFunctions";
import { Link } from "react-router-dom";


const MyProfile = () => {
    const [getdata, setGetdata] = useState("");
    const role = localStorage.getItem("roleName");
    const dispatch = useDispatch();

    // getme data
    // const gettingData = async () => {
    //     const parameter = {
    //         url: authEndPoints.profile.getme,
    //     };
    //     try {
    //         const response = await dispatch(getMe(parameter)).unwrap();
    //         setGetdata(response);
    //     } catch (errors) {
    //         errorAlert(errors?.error);
    //     }
    // };



    // useEffect(() => {
    //     gettingData();
    // }, []);


    return (
        <Box className="indexBox">
            <TopBreaccrumb title={"My Profile"} to={`/${role}/dashboard`} />
            <Grid
                container
                spacing={2}
                sx={{ my: 4 }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={6} sx={{ backgroundColor: "#ddf0dd" }}>
                    <Stack direction={'row'} alignItems={'end'} justifyContent={'end'} gap={5} sx={{ p: 3 }} >
                        <Link to={`/${role}/editProfile`} >
                            <Button>Edit</Button>
                        </Link>
                    </Stack>
                    <Container maxWidth="xs">
                        <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    badgeContent={
                                        <Avatar
                                            sx={{
                                                backgroundColor: "#d9d9d9",
                                                width: 25,
                                                height: 25,
                                                color: "#666666",
                                            }}
                                        >
                                            <AddPhotoAlternateIcon />
                                        </Avatar>
                                    }
                                >
                                    <Avatar
                                        alt={getdata?.data?.name}
                                        src={getdata?.data?.image}
                                        sx={{
                                            width: 111,
                                            height: 110,
                                            backgroundColor: "#c1cfc1",
                                        }}
                                    />
                                </Badge>
                                <Typography>{getdata?.data?.email}</Typography>
                            </Grid>

                            <Grid item xs={12} direction={"column"} marginTop={3}>
                                <Typography>Name</Typography>
                                <Typography className="myprofilePara">{getdata?.data?.name}</Typography>
                            </Grid>
                            <Grid item xs={12} direction={"column"}>
                                <Typography>Role Name</Typography>
                                <Typography className="myprofilePara">{getdata?.data?.role_name}</Typography>
                            </Grid>
                            <Grid item xs={12} direction={"column"}>
                                <Typography>Mobile</Typography>
                                <Typography className="myprofilePara">{getdata?.data?.mobile}</Typography>
                            </Grid>
                            <Grid item xs={12} direction={"column"}>
                                <Typography>Address</Typography>
                                <Typography className="myprofilePara">{getdata?.data?.address}</Typography>
                            </Grid>
                            <Grid item xs={12} direction={"column"} sx={{ mb: 4 }}>
                                <Typography>Zip Code</Typography>
                                <Typography className="myprofilePara">{getdata?.data?.zip_code}</Typography>
                            </Grid>
                        </Grid>

                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MyProfile;
