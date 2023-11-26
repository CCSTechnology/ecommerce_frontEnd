import React from "react";
import { Grid } from "@mui/material";
import { logo } from "../../../helpers/images";
import ImageComponent from "../../../components/Images";
import SignUpForm from "./SignUpForm";
import Banner from "../../../assets/images/peanut-butter3.jpg";
import StyledContainer from "../../../components/ecommerce/StyledContainer";

export default function SignUp() {
  return (
    <StyledContainer>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="text-center-cls authLogo"
        >
          <img src={Banner} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <SignUpForm />
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
