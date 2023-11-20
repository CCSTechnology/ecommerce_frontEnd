import { Container, Grid, Box, Typography, Skeleton, Stack, Divider } from '@mui/material'
import React from 'react'

function TaskDetailsLoader() {
    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            sx={{
                backgroundColor: "#ffffff",
            }}
        >
            <Container>
                <Box id={"1"}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: "30px" }}>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Date and Time
                            </Typography>
                            <Box spacing={2} className="taskview-one" sx={{ p: 2 }}>
                                <Skeleton variant="rectangular" height={150} />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Task Details
                            </Typography>
                            <Box spacing={2} className="taskview-one" sx={{ p: 2 }}>
                                <Skeleton variant="rectangular" height={150} />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Shift Details
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Job
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Form Link
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Chat Link
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Details
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Assigned to
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Assigned by
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Status
                            </Typography>
                            <Skeleton />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ paddingBottom: "10px" }} className="taskview-form">
                                Amount
                            </Typography>
                            <Box className="taskview" sx={{ p: 2 }}>
                                <Skeleton />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Grid>
    )
}

export default TaskDetailsLoader