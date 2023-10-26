/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Person, TaskList, Invoice, Forms, QuickTask } from "helpers/images";
import { Link } from "react-router-dom";

function DashboardBox() {
    const roleName = localStorage.getItem("roleName");
    return (
        <Grid container spacing={5} >
            <Grid item md={8}>
                <Stack direction={{ lg: "row", sm: "column" }} gap={2} justifyContent={'space-around'} alignItems={'center'}
                    sx={{ border: '1px solid #d8d7d7;', p: 2, pb: 5, borderRadius: '10px' }}>
                    <Box className='dashboardLinkBox'>
                        <Link to={`/category`}>
                            <img src={Person} />
                            <Typography>Categories</Typography>
                        </Link>
                    </Box>
                    <Box className='dashboardLinkBox'>
                        <Link to={`/Products`}>
                            <img src={TaskList} />
                            <Typography>Products</Typography>
                        </Link>
                    </Box>
                    <Box className='dashboardLinkBox'>
                        <Link to={`/employees`}>
                            <img src={Invoice} />
                            <Typography>Customers</Typography>
                        </Link>
                    </Box>
                </Stack>
            </Grid>
            <Grid item md={4}>
                <Stack direction={{ lg: "row", sm: "column" }} gap={2} justifyContent={'space-around'} alignItems={'center'}
                    sx={{ border: '1px solid #d8d7d7;', p: 2, pb: 5, borderRadius: '10px' }}>
                    <Box className='dashboardLinkBox'>
                        <Link to={`/category`}>
                            <img src={Forms} />
                            <Typography>Category List</Typography>
                        </Link>
                    </Box>
                    <Box className='dashboardLinkBox'>
                        <Link to={`/products`}>
                            <img src={QuickTask} />
                            <Typography>Product List</Typography>
                        </Link>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default DashboardBox