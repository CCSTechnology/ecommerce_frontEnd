import { Grid } from "@mui/material";
import Authentication from "components/Authentication";
import ImageComponent from "components/Images";
import { logo } from "helpers/images"
import React from "react";


const EmailVerify = () => {
	return (
		<Grid container spacing={2} alignItems={'center'}>
			<Grid item xs={12} sm={12} md={6} lg={6} className="text-center-cls">
				<ImageComponent src={logo} alt='logo' />
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={6}>
				<Authentication />
			</Grid>
		</Grid>
	)
};

export default EmailVerify;
