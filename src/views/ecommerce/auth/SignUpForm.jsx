import { Box, TextField, Typography, Grid, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { publicAuthRegister } from "../../../redux/api/public/authService";
import { errorAlert, successAlert } from "../../../helpers/globalFunctions";
import { email, password } from "../../../helpers/constant";
import { logo } from "../../../helpers/images";
import ImageComponent from "../../../components/Images";

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email(email.valid).required(email.required),
    password: yup
      .string()
      .min(8, password.min)
      .max(32, password.max)
      .required(password.required),
    first_name: yup
      .string()
      .required("First Name is required")
      .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
    last_name: yup
      .string()
      .required("Last Name is required")
      .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
    mobile: yup
      .string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (values) => {
    try {
      const response = await dispatch(publicAuthRegister(values)).unwrap();
      successAlert(response.message);
      navigate("/login");
    } catch (error) {
      errorAlert(error.error);
    }
  };

  return (
    <Box>
      <Box className="text-center-cls">
        <ImageComponent
          src={logo}
          alt="logo"
          width={"200px"}
          height={"100px"}
        />

        <Typography
          sx={{ mt: 3 }}
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "#951e76",
          }}
        >
          Create New Account
        </Typography>
      </Box>
      <Box sx={{ m: 5, mx: { md: 15, xs: 5 } }} className="formFullCtr">
        <form onSubmit={handleSubmit(handleRegister)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name={"first_name"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"First Name"}
                    size="medium"
                    error={errors.first_name}
                    helperText={errors.first_name?.message}
                    className="authTextField"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name={"last_name"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"Last Name"}
                    size="medium"
                    error={errors.last_name}
                    helperText={errors.last_name?.message}
                    className="authTextField"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name={"email"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"Email ID"}
                    size="medium"
                    error={errors.email}
                    helperText={errors.email?.message}
                    className="authTextField"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name={"mobile"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"Mobile Number"}
                    size="medium"
                    error={errors.mobile}
                    helperText={errors.mobile?.message}
                    className="authTextField"
                    fullWidth
                  />
                )}
              />
              {/* <MobileField
                name="mobile"
                control={control}
                Controller={Controller}
                label="Mobile Number"
                error={errors?.mobile?.message}
                fullWidth
                className="authTextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+61</InputAdornment>
                  ),
                }}
              /> */}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name={"password"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={onChange}
                    value={value}
                    type={showPassword ? "text" : "password"}
                    label={"Password"}
                    size="medium"
                    error={errors.password}
                    helperText={errors.password?.message}
                    className="authTextField"
                    fullWidth
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Controller
                name={"address"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"Mobile Number"}
                    size="medium"
                    error={errors.address}
                    helperText={errors.address?.message}
                    className="authTextField"
                    fullWidth
                  />
                )}
              />
            </Grid> */}
          </Grid>

          <Box className="text-center-cls" sx={{ my: 3 }}>
            <LoadingButton
              loadingPosition="center"
              loading={isSubmitting}
              variant="contained"
              type="submit"
              className="signup-button"
              style={{ backgroundColor: "white", color: "#951e76" }}
            >
              SignUp
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default SignUpForm;
