/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Container,
  Grid,
} from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import React, { useEffect, useState } from "react";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch } from "react-redux";
import { changePassword, getMe } from "redux/api/services/profileService";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordField from "components/reusableFormFields/TextField/passwordField";
import { changePasswordSchema } from "helpers/validate";


const ChangePassword = () => {
  const [getdata, setGetdata] = useState("");
  const role = localStorage.getItem("roleName");

  const dispatch = useDispatch();
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onSubmit'
  });

  // getme data
  const gettingData = async () => {
    const parameter = {
      url: authEndPoints.profile.getme,
    };
    try {
      const response = await dispatch(getMe(parameter)).unwrap();
      setGetdata(response);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // changepassword api
  const handleChangePassword = async (data) => {
    const parameter = {
      url: authEndPoints.profile.changepassword,
      data: data,
    };
    try {
      const response = await dispatch(changePassword(parameter)).unwrap();
      successAlert(response?.message);
      reset();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <Box className="indexBox">
      <TopBreaccrumb title={"Change Password"} to={`/${role}/dashboard`} />
      <Grid
        container
        spacing={2}
        sx={{ my: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6} sx={{ backgroundColor: "#ddf0dd" }}>
          <Container maxWidth="xs">
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{
                  mb: 3,
                }}
              >
                <Grid item xs={12} direction={"column"} marginTop={3}>
                  <PasswordField
                    placeholder="Current Password"
                    name="old_password"
                    control={control}
                    Controller={Controller}
                    error={errors?.old_password?.message}
                    label="Password"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} direction={"column"}>
                  <PasswordField
                    placeholder="New Password"
                    name="new_password"
                    control={control}
                    Controller={Controller}
                    error={errors?.new_password?.message}
                    label="New Password"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} direction={"column"}>
                  <PasswordField
                    placeholder="Confirm Password"
                    name="confirm_password"
                    control={control}
                    Controller={Controller}
                    error={errors?.confirm_password?.message}
                    label="Confirm Password"
                    type="text"
                  />
                </Grid>
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>

          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChangePassword;
