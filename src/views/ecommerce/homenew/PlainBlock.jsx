import { Box, Container, styled, Stack, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { product_1, product_2, product_3 } from "../../../helpers/images";

const PlainBlock = () => {
  return (
    <Box sx={{ background: "white" }}>
      <Container maxWidth={"lg"}>
        <Grid container pt={7} pb={4}>
          <Grid item md={12}>
            <Box
              sx={{
                background: "#E3E3E3",
                height: "185px",
                borderRadius: "10px",
              }}
            ></Box>
          </Grid>
        </Grid>
        <Grid container pt={2} pb={6}>
          <Grid item md={12}>
            <Box
              sx={{
                background: "#E3E3E3",
                height: "185px",
                borderRadius: "10px",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PlainBlock;
