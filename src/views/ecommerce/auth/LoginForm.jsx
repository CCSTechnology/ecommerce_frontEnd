import { Box, TextField, Typography, Grid, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { publicAuthLogin } from "../../../redux/api/public/authService";
import { errorAlert, successAlert } from "../../../helpers/globalFunctions";
import { email, password } from "../../../helpers/constant";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()
  

  const [showPassword, setShowPassword] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email(email.valid).required(email.required),
    password: yup
      .string()
      .min(8, password.min)
      .max(32, password.max)
      .required(password.required),
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

  const handleLogin = async (values) => {
    const cardId = searchParams.get("cart_id") || null
    const path = searchParams.get("callBackUrl") || "/"
    if(cardId){
      values.cart_id = cardId
    }
    const parameters = {
    //   url: authEndPoints.user.userLogin,
      data: values,
    };
    try {
      const response = await dispatch(publicAuthLogin(parameters)).unwrap();
      localStorage.setItem("public_token", response?.token);
      if(cardId){
        localStorage.removeItem("cart_id")
      }
      successAlert(response.message);
      navigate(path);
    } catch (error) {
      errorAlert(error.error);
    }
  };

  return (
    <Box>
      <Box className="text-center-cls">
        <Typography className="welcomeHead">Welcome</Typography>
        <Typography className="welcomeSubHead" sx={{ mt: 1 }}>
          Log in to your Company{" "}
        </Typography>
      </Box>
      <Box sx={{ m: 5, mx: 15 }} className="formFullCtr">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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

            <Grid item xs={12} className="forgotCtr">
              <Link to="/forgot-password">Forget password?</Link>
            </Grid>
          </Grid>

          <Box className="text-center-cls" sx={{ my: 1 }}>
            <LoadingButton
              loadingPosition="center"
              loading={isSubmitting}
              variant="contained"
              type="submit"
              className="Submitbtn"
              style={{ backgroundColor: "#951e76" }}
            >
              Log In
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
