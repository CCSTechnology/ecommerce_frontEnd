import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { ContactEmergency } from "@mui/icons-material";
import { Peanut, PeanutOne } from "../../../helpers/images";

const HomeDesignNew = () => {
  return (
    <Box sx={{ background: "white" }} pt={8}>
      <Container maxWidth={"lg"}>
        <Grid container>
          <Grid item md={6}>
            <Grid item md={10}>
              <Stack direction="column">
                <p className="home-design">NOT JUST ANOTHER PEANUT BUTTER.</p>
                <p className="home-design1">
                  At Truevine, we believe in offering more than just a simple
                  spread—our peanut butter is an experience. Unlike the rest,
                  our peanut butter stands out for its rich texture, bold
                  flavors, and uncompromising quality. Whether you're enjoying
                  it on toast, adding it to your favorite recipes, or eating it
                  straight from the jar, our peanut butter transforms every bite
                  into a moment of bliss.
                </p>
              </Stack>
            </Grid>
          </Grid>
          <Grid item md={6} mb={4} pl={4}>
            <Box
              sx={{
                background: "#F9F9F9",
                height: "433px",
                borderRadius: "33px",
                width: "538px",
              }}
            >
              <img
                src={PeanutOne}
                className="home-featured-image"
                style={{
                  width: "538px",
                  height: "433px",
                  borderRadius: "33px",
                }}
              ></img>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} mb={4}>
            <Box
              sx={{
                background: "#F9F9F9",
                height: "433px",
                borderRadius: "33px",
                width: "538px",
              }}
            >
              {" "}
              <img
                src={Peanut}
                className="home-featured-image"
                style={{
                  width: "538px",
                  height: "433px",
                  borderRadius: "33px",
                }}
              ></img>
            </Box>
          </Grid>
          <Grid item md={6} pl={4}>
            <Grid item md={10}>
              <Stack direction="column">
                <p className="home-design2">WHAT MAKES US DIFFERENT? </p>
                <p className="home-design3">
                  We carefully select the finest peanuts, roasted to perfection,
                  ensuring a smooth, creamy consistency or a delightful
                  crunch—whichever you prefer. Packed with protein and natural
                  goodness, our peanut butter isn't just another option on the
                  shelf. It's the choice for those who want to elevate their
                  everyday meals and snacks. Taste the difference and see why
                  it’s truly Not Just Another Peanut Butter.
                </p>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeDesignNew;
