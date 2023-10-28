import React, { useEffect } from "react";
import { Box, Grid, Skeleton, Avatar, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { authEndPoints } from "../../../../helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "../../../../helpers/globalFunctions";
import { useParams } from "react-router-dom";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import "./style.css";
import { viewCustomerData } from "../../../../redux/api/admin/customerService";

const EmployeeView = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const customerViewData = useSelector(
    (state) => state.adminCustomer.viewCustomer
  );
  const role = localStorage.getItem("roleName");
  console.log(customerViewData);
  //list api
  const viewEmployee = async () => {
    const parameters = {
      url: `${authEndPoints.customer.customerView(id)}`,
    };
    try {
      await dispatch(viewCustomerData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    viewEmployee();
  }, []);
  return (
    <Box className="indexBox">
      <TopBreaccrumb title={"Customer Data"} to={`admin/customers`} />
      <Grid
        container
        spacing={2}
        sx={{ my: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={7}
          sx={{ backgroundColor: "#951e76", my: 4 }}
        >
          <Stack direction={"column"} gap={1} alignItems={"center"}>
            {!customerViewData?.loading ? (
              <Avatar src="" sx={{ width: 60, height: 60 }} />
            ) : (
              <Skeleton variant="circular" width={60} height={60} />
            )}
            <Typography sx={{ mb: 2, color: "white" }}>
              {!customerViewData?.loading ? (
                `${customerViewData?.data?.data?.first_name} ${customerViewData?.data?.data?.last_name}`
              ) : (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              )}
            </Typography>
          </Stack>
          <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid
              item
              xs={10}
              sm={10}
              md={11}
              sx={{ border: "1px solid white", mb: 4 }}
            >
              <Grid container>
                <Grid item xs={5} md={4} sm={5}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      First Name
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} md={8} sm={7}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      {!customerViewData?.loading ? (
                        customerViewData?.data?.data?.first_name
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5} sm={5} md={4}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      Last Name
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={7} md={8}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      {!customerViewData?.loading ? (
                        customerViewData?.data?.data?.last_name
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5} sm={5} md={4}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      Phone Number
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={7} md={8}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      {!customerViewData?.loading ? (
                        customerViewData?.data?.data?.mobile
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5} sm={5} md={4}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      Email ID
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={7} md={8}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      {!customerViewData?.loading ? (
                        customerViewData?.data?.data?.email
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {/* <Grid container>
                <Grid item xs={5} sm={5} md={4}>
                  <Box className="viewLeftSide" height={100}>
                    <Typography sx={{ py: 3, mb: 1 }}>Address</Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={7} md={8}>
                  <Box className="viewRightSide" height={100}>
                    <Typography sx={{ py: 2 }}>
                      {!customerViewData?.loading ? (
                        customerViewData?.data?.data?.address
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5} sm={5} md={4}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2 }}>Country</Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={7} md={8}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2 }}>
                      {!customerViewData?.loading ? (
                        customerViewData?.data?.data?.country
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5} sm={5} md={4}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2 }}>Postal Code</Typography>
                  </Box>
                </Grid>
                <Grid item xs={7} sm={7} md={8}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2 }}>
                      {!employeeViewData?.loading ? (
                        employeeViewData?.data?.data?.zip_code
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeView;
