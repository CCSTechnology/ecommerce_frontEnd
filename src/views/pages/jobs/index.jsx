import React from "react";
import TopBreaccrumb from "components/TopBreadcrumb";
import { Box, Grid } from "@mui/material";
import "./style.css";
import Jobcalendar from "./jobcalendar";
import "react-datepicker/dist/react-datepicker.css";


const Jobs = () => {
  const role = localStorage.getItem("roleName");

  return (

    <Box className="indexBox">
      <TopBreaccrumb title={"Jobs"} to={`/${role}/dashboard`} />
      <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
        <Jobcalendar />
      </Grid>
    </Box>
  );
};

export default Jobs;
