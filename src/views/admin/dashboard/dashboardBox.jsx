/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  Person,
  TaskList,
  Invoice,
  Forms,
  QuickTask,
} from "../../../helpers/images";
import { Link } from "react-router-dom";
import { authEndPoints } from "../../../helpers/endpoints";
import { dashboardListDatas } from "../../../redux/api/admin/dashboardService";
import { useDispatch } from "react-redux";
import { errorAlert } from "../../../helpers/globalFunctions";

function DashboardBox() {
  // const roleName = localStorage.getItem("roleName");
  const dispatch = useDispatch();
  const [dashboardContents, setDashboardContents] = useState(null);
  const dashboardListApi = async () => {
    const parameters = {
      url: `${authEndPoints.dashboard.dashboardData}`,
    };
    try {
      const res = await dispatch(dashboardListDatas(parameters)).unwrap();
      setDashboardContents(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    dashboardListApi();
  }, []);
  return (
    <Grid container spacing={5}>
      <Grid item md={4}>
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            border: "1px solid #d8d7d7;",
            p: 2,
            pb: 5,
            borderRadius: "10px",
          }}
        >
          <Box className="dashboardLinkBox">
            <Link to={`/admin/customers`}>
              <img src={Person} />
              {/* <Typography>Customers</Typography> */}
              <Typography>Total Customer</Typography>
              <Typography>{dashboardContents?.data?.customer}</Typography>
            </Link>
          </Box>
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            border: "1px solid #d8d7d7;",
            p: 2,
            pb: 5,
            borderRadius: "10px",
          }}
        >
          <Box className="dashboardLinkBox">
            <Link to={`/admin/category`}>
              <img src={Person} />
              <Typography>Categories Count</Typography>
              <Typography>{dashboardContents?.data?.category}</Typography>
            </Link>
          </Box>
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            border: "1px solid #d8d7d7;",
            p: 2,
            pb: 5,
            borderRadius: "10px",
          }}
        >
          <Box className="dashboardLinkBox">
            <Link to={`/admin/products`}>
              <img src={Person} />
              <Typography>Products Count</Typography>
              <Typography>{dashboardContents?.data?.products}</Typography>
            </Link>
          </Box>
        </Stack>
      </Grid>

      {/* <Grid item md={4}>
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
            </Grid> */}
    </Grid>
  );
}

export default DashboardBox;
