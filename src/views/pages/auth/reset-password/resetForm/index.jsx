import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "redux/api/services/authService";
import { authEndPoints } from "helpers/endpoints";
import { useSearchParams } from "react-router-dom";
import { password, password_confirmation } from "helpers/constant";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { LoadingButton } from "@mui/lab";

function ResetForm() {
	const navigate = useNavigate();
	const dispacth = useDispatch();
	const [searchParams] = useSearchParams();
	const schema = yup.object().shape({
		password: yup
			.string()
			.min(8, password.min)
			.max(32, password.max)
			.required(password.required),
		password_confirmation: yup
			.string()
			.oneOf([yup.ref("password"), null], password_confirmation.compare)
			.min(8, password_confirmation.min)
			.max(32, password_confirmation.max)
			.required(password_confirmation.required),
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleResetPassword = async (values) => {
		const email = searchParams.get("email");
		const token = searchParams.get("token");
		const parameters = {
			url: authEndPoints.user.userResetPassword,
			data: {
				...values,
				email,
				token,
			},
		};
		try {
			const response = await dispacth(resetPassword(parameters)).unwrap();
			successAlert(response.message);
			navigate("/email-verify");
		} catch (error) {
			errorAlert(error.error);
			navigate("/email-verify");
		}
	};

	return (
		<Box>
			<Box className="text-center-cls">
				<Typography className="welcomeHead">Reset Password</Typography>
			</Box>
			<Box sx={{ m: 5, mx: 15 }} className='formFullCtr'>
				<form onSubmit={handleSubmit(handleResetPassword)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Controller
								name={"password"}
								control={control}
								render={({ field: { onChange, value } }) => (
									<TextField
										onChange={onChange}
										value={value}
										label={"Password"}
										size="medium"
										className="authTextField"
										error={errors.password}
										helperText={errors.password?.message}
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name={"password_confirmation"}
								control={control}
								render={({ field: { onChange, value } }) => (
									<TextField
										onChange={onChange}
										value={value}
										label={"Confrim password"}
										size="medium"
										className="authTextField"
										error={errors.password_confirmation}
										helperText={errors.password_confirmation?.message}
										fullWidth
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

export default ResetForm;
