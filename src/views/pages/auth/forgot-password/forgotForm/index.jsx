import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch } from "react-redux";
import { forgetPassword } from "redux/api/services/authService";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { email } from "helpers/constant";
import { LoadingButton } from "@mui/lab";

function ForgotPasswordForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const schema = yup.object().shape({
		email: yup.string().email(email.valid).required(email.required),
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleForgetPassword = async (data) => {
		const parameters = {
			url: authEndPoints.user.userForgetPassword,
			data: data,
		};
		try {
			const response = await dispatch(forgetPassword(parameters)).unwrap();
			successAlert(response?.message);
			navigate("/reset-password");
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	return (
		<Box>
			<Box className="text-center-cls">
				<Typography className="welcomeHead">Forget Password</Typography>
				<Typography className="welcomeSubHead" sx={{ mt: 1 }}>
					Enter your Mail id to reset your Password
				</Typography>
			</Box>
			<Box sx={{ m: 5, mx: 15 }} className='formFullCtr'>
				<form onSubmit={handleSubmit(handleForgetPassword)}>
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
										className="authTextField"
										fullWidth
										error={errors.email}
										helperText={errors.email?.message}
									/>
								)}
							/>
						</Grid>
					</Grid>

					<Box className="text-center-cls" sx={{ my: 2 }}>
						<LoadingButton
							loading={isSubmitting}
							variant="contained"
							className="submitBtn"
							type="submit">
							Submit
						</LoadingButton>
					</Box>
				</form>
			</Box>
		</Box>
	);
}

export default ForgotPasswordForm;
