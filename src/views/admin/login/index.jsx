import React from "react";
import { Grid } from '@mui/material';
import { logo } from "../../../helpers/images"
import ImageComponent from "../../../components/Images";
import LoginForm from "./LoginForm";

const Login = () => {
	return (
		<Grid container spacing={2} alignItems={'center'}>
			<Grid item xs={12} sm={12} md={6} lg={6} className="text-center-cls authLogo">
				<ImageComponent src={logo} alt='logo' />
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={6}>
				<LoginForm />
			</Grid>
		</Grid>
	)
}

export default Login;