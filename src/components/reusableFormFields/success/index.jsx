import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import successImage from "../../../assets/images/payment-success.png";
import ImageComponent from "../../../components/Images";
import { logo } from "../../../helpers/images";
const SuccessError = ({ title, path }) => {
  return (
    <Container>
      <Box
        sx={{
          background: "#e1e1ec",
          height: { md: "450px", sm: "400px" },
          width: { md: "450px" },
          borderRadius: "20px",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            className="text-center-cls authLogo"
            sx={{ mt: 2 }}
          >
            <img src={logo} width={"200px"} />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", mt: 10 }}>
            <img src={path} width={"80px"} height={"80px"} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
              mt: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "fantasy",
                fontSize: "30px",
                fontWeight: "600",
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SuccessError;
