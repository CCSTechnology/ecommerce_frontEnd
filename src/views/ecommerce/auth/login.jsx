import React from "react";
import { Box, Grid } from "@mui/material";
import { logo } from "../../../helpers/images";
import ImageComponent from "../../../components/Images";
import Banner from "../../../assets/images/peanut-butter3.jpg";
import LoginForm from "./LoginForm";
import StyledContainer from "../../../components/ecommerce/StyledContainer";

const Login = () => {
  return (
    <StyledContainer>
      <Grid
        container
        spacing={2}
        alignItems={"center"}
        className="img-banner-logo"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="text-center-cls authLogo img-banner-logo1"
        >
          <Box>
            <img src={Banner} style={{ width: "100%" }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Login;
