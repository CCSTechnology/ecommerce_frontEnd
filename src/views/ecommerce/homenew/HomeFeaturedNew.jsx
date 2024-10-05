import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { ContactEmergency } from "@mui/icons-material";
import { Fiber, Protein, Vitamin } from "../../../helpers/images";

const HomeFeaturedNew = () => {
  return (
    <Box sx={{ background: "white" }}>
      <Grid container>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="column">
            {/* <p className="home-new-featured">Lorem ipsum dolor</p> */}
            <p className="home-new-featured1">
              Peanut Butter is a Energy Butter
            </p>
          </Stack>
        </Grid>
      </Grid>
      {/* <Container> */}
      <Grid container mt={3}>
        <Grid
          item
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="column">
            <Grid
              md={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {" "}
              <img
                src={Fiber}
                className="home-featured-image"
                style={{ width: "150px", height: "130px" }}
              ></img>
            </Grid>

            {/* <p className="home-new-featured2">Point 1</p> */}
            <p className="home-new-featured3">Rich Fiber</p>
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Stack direction="column">
            <Grid
              md={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src={Protein}
                className="home-featured-image"
                style={{ width: "170px", height: "130px" }}
              ></img>
            </Grid>

            {/* <p className="home-new-featured2">Point 2</p> */}
            <p className="home-new-featured3">High Protein</p>
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Stack direction="column">
            <Grid
              md={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src={Vitamin}
                className="home-featured-image"
                style={{ width: "130px", height: "130px" }}
              ></img>
            </Grid>

            {/* <p className="home-new-featured2">Point 3</p> */}
            <p className="home-new-featured3">Multi Vitamins</p>
          </Stack>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default HomeFeaturedNew;
