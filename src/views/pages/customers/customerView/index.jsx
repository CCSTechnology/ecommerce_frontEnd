import React, { useEffect } from "react";
import { Box, Grid, Skeleton, Avatar, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { authEndPoints } from "helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from 'helpers/globalFunctions'
import { useParams } from "react-router-dom";
import { viewEmployeeData } from "redux/api/services/employeeService";
import TopBreaccrumb from "components/TopBreadcrumb";
import './style.css';

const EmployeeView = () => {

    let { id } = useParams();
    const dispatch = useDispatch()
    const employeeViewData = useSelector((state) => state.employee.viewEmployee)
    const role = localStorage.getItem("roleName");

    //list api
    const viewEmployee = async () => {
        const parameters = {
            url: `${authEndPoints.employee.viewEmployee(id)}`,
        };
        try {
            await dispatch(viewEmployeeData(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };
    useEffect(() => {
        viewEmployee()
    }, [])
    return (
        <Box className="indexBox">
            <TopBreaccrumb title={'Employee List'} to={`/${role}/employees`} />
            <Grid container
                spacing={2}
                sx={{ my: 4 }}
                justifyContent="center"
                alignItems="center">
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={9}
                    lg={7}
                    sx={{ backgroundColor: "#DDF1DE", my: 4 }}
                >
                    <Stack direction={'column'} gap={1} alignItems={'center'}>
                        {!employeeViewData?.loading
                            ?
                            <Avatar src={employeeViewData?.data?.data?.image} sx={{ width: 60, height: 60 }} />
                            : <Skeleton variant="circular" width={60} height={60} />
                        }
                        <Typography sx={{ mb: 2 }}>
                            {!employeeViewData?.loading
                                ? `${employeeViewData?.data?.data?.first_name} ${employeeViewData?.data?.data?.last_name}` :
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            }
                        </Typography>
                    </Stack>
                    <Grid container alignItems={'center'} justifyContent={'center'} >
                        <Grid item xs={10} sm={10} md={11} sx={{ border: '1px solid black', mb: 4 }}>
                            <Grid container >
                                <Grid item xs={5} md={4} sm={5}>
                                    <Box className='viewLeftSide'>
                                        <Typography sx={{ py: 2 }}>First Name</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} md={8} sm={7}>
                                    <Box className='viewRightSide'>
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.first_name : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} sm={5} md={4}>
                                    <Box className='viewLeftSide'>
                                        <Typography sx={{ py: 2 }}>Last Name</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} sm={7} md={8}>
                                    <Box className='viewRightSide'>
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.last_name : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} sm={5} md={4}>
                                    <Box className='viewLeftSide'>
                                        <Typography sx={{ py: 2 }}>Phone Number</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} sm={7} md={8}>
                                    <Box className='viewRightSide'>
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.mobile : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} sm={5} md={4}>
                                    <Box className='viewLeftSide'>
                                        <Typography sx={{ py: 2 }}>Email ID</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} sm={7} md={8}>
                                    <Box className='viewRightSide'>
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.email : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={5} sm={5} md={4}>
                                    <Box className='viewLeftSide' height={100}>
                                        <Typography sx={{ py: 3, mb: 1 }}>Address</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} sm={7} md={8}>
                                    <Box className='viewRightSide' height={100}>
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.address : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} sm={5} md={4}>
                                    <Box className='viewLeftSide'>
                                        <Typography sx={{ py: 2 }}>Country</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} sm={7} md={8}>
                                    <Box className='viewRightSide' >
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.country : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} sm={5} md={4}>
                                    <Box className='viewLeftSide'>
                                        <Typography sx={{ py: 2 }}>Postal Code</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={7} sm={7} md={8}>
                                    <Box className='viewRightSide'>
                                        <Typography sx={{ py: 2 }}>
                                            {!employeeViewData?.loading
                                                ? employeeViewData?.data?.data?.zip_code : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}

export default EmployeeView;