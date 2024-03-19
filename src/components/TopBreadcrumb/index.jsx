import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function TopBreaccrumb({ title, to }) {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2} className="breaccrumbTopbar">
        <Grid item xs={12} sm={6} md={8}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "right" }}>
          <Link to={`${to}`}>{`<<Back`}</Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TopBreaccrumb;
