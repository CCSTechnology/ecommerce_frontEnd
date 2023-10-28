import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
// import AddressField from "components/reusableFormFields/AddressField/addressField";
// import TextFormField from "components/reusableFormFields/TextField";
// import SelectField from "components/reusableFormFields/selectField";
import React from "react";

const FormLoader = () => {
    return (
        <div>
            <Box sx={{ mx: 2 }}>
                <form>
                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6} direction={"column"}>
                            <Typography>Product Naame</Typography>
                            <Skeleton />
                        </Grid>
                        <Grid item xs={6} direction={"column"}>
                            <Typography>Category</Typography>
                            <Skeleton />
                        </Grid>
                    </Grid>

                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <Typography>Cost</Typography>
                            <Skeleton />
                        </Grid>
                        <Grid item xs={6}>
                             <Typography variant="subtitle1">Profile Image</Typography>
                            <Skeleton variant="circular" width={40} height={40} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                             <Typography>Description</Typography>
                            <Skeleton />
                        </Grid>
                    </Grid>

                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={5}
                        sx={{ p: 3 }}
                    >
                        <Box className="submitBtnn">
                            <Skeleton variant="rectangular" />
                        </Box>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default FormLoader;
