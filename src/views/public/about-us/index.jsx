import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import successImage from "../../../assets/images/payment-success.png";
import { Box, Container, Grid, Typography } from "@mui/material";
import About from "../../../assets/images/about-us.jpg";
import { Link } from "react-router-dom";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
const AboutUs = ({ title }) => {
  return (
    <>
      <StyledContainer>
        <Box sx={{}}>
          <Grid container>
            <Grid
              item
              xs={12}
              className="about-banner"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{ fontSize: "40px", fontWeight: 600, color: " white" }}
              >
                About Us
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>I ABOUT US</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={About} />
            </Grid>
          </Grid>
        </Box>
      </StyledContainer>
    </>
  );
};
export default AboutUs;
