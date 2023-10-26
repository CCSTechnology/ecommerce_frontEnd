import React from "react";
import {Box, Grid} from '@mui/material';

const Registration = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
	      	<Grid container spacing={0} className="full-h">
		        <Grid item xs={6} className="primary-bg">
		          
		        </Grid>
		        <Grid item xs={6} className="full-h">
		          	<Grid
					  	direction="row"
					  	justifyContent="center"
					  	alignItems="center"
					  	className="full-h">
					  	<Grid item xs={6}>
					    	Registration
					  	</Grid>
					</Grid>
		        </Grid>
	      	</Grid>
	    </Box>
    )
}

export default Registration;