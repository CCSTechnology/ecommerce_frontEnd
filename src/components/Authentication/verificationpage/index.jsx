import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ImageComponent from "components/Images";
import { logo } from "helpers/images";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import WarningIcon from "@mui/icons-material/Warning";

const VerificationPage = (props) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate a loading delay
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Grid container spacing={2} alignItems={"center"}>
			{/* <Grid item xs={12} sm={12} md={6} lg={6} className="text-center-cls">
        <ImageComponent src={logo} alt='logo' />
      </Grid> */}
			<Grid item xs={12} sm={12} md={12} lg={12} className="homepage ">
				{props.message === "Email verified successfully" ? (
					<Box
						sx={{
							width: "100%",
							background: "flex",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "10px",
							justifyContent: "center",
						}}
					>
						<DoneIcon className="check-icon" />
						<Typography
							variant="h5"
							sx={{
								fontWeight: "700",
							}}
						>
							{props.message}
						</Typography>
					</Box>
				) : props.message === "error" ? (
					<>
						<DangerousIcon className="check-icon1" />

						<Typography variant="h5" className="fonts">
							Error !
						</Typography>
					</>
				) : props.message === "expiry" ? (
					<>
						<WarningIcon className="check-icon2" />

						<Typography variant="h5" className="fonts">
							Expiry !
						</Typography>
					</>
				) : props.message === "Password has been reset" ? (
					<>
						<div className="loading-container">{isLoading ? <CircularProgress size={60} /> : <DoneIcon className="check-icon" />}</div>
						<Typography variant="h5" className="fonts">
							Password Reset Successfully
						</Typography>
						<Button
							href="/login"
							sx={{
								marginTop: "10px",
							}}
						>
							Back to Login
						</Button>
					</>
				) : null}
			</Grid>
		</Grid>
	);
};

export default VerificationPage;
