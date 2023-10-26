import React from "react";
import { Grid } from '@mui/material';

const NotFound = (props) => {

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item md={12}>
                Not Found
            </Grid>
            
        </Grid>
    )
}

export default NotFound;