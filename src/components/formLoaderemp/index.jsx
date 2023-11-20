import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
// import AddressField from "components/reusableFormFields/AddressField/addressField";
// import TextFormField from "components/reusableFormFields/TextField";
// import SelectField from "components/reusableFormFields/selectField";
import React from "react";

const FormLoaderEmp = () => {
    return (
        <div>
            <Box sx={{ mx: 2 }}>
                <form>
                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6} direction={"column"}>
                            <Typography>First Name</Typography>
                            <Skeleton />
                        </Grid>
                        <Grid item xs={6} direction={"column"}>
                            <Typography>Last Name</Typography>
                            <Skeleton />
                        </Grid>
                    </Grid>

                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <Typography>Email</Typography>
                            <Skeleton />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Mobile</Typography>
                            <Skeleton />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={12} className="address-employee">
                            <Typography>Address</Typography>
                            <Skeleton />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid mt={5} pl={5} xs={6}>
                            <Typography>Postal Code</Typography>
                            <Skeleton />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Profile Image</Typography>
                            <Skeleton variant="circular" width={40} height={40} />
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

export default FormLoaderEmp;
