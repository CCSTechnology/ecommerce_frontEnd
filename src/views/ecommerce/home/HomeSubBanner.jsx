import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import AOS from "aos";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const CustomDotIndicator = () => {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        zIndex: 999,
        width: "40px",
        height: "4px",
        borderRadius: "2px",
        margin: "0 5px",
        // backgroundColor: "rgba(103, 103, 103, 0.40)",
      }}
    ></div>
  );
};

const data = [
  {
    heading: "PEANUT BUTTER",
    icon: "https://ccstechnolgy.s3.eu-north-1.amazonaws.com/TruevineProducts/b12c46e7-7fb2-44b4-a16e-78867ad2c372.webp",
    title: [
      "ENERGY BOOSTER",
      "0 CHOLESTROL TRANS FAT",
      "HIGH PROTEIN",
      "VITAMINS & MINERALS",
      "RICH IN FIBER",
      "HEALTHY FATS",
      "WEIGHT MANAGEMENT",
    ],
    nutrients: [
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
    ],

    // description: "Crafting user experiences with innovative design.",
  },
  {
    heading: "PEANUT BUTTER",
    icon: "https://ccstechnolgy.s3.eu-north-1.amazonaws.com/TruevineProducts/aa4e7201-e07b-4bd0-a3a1-c669e4609b46.webp",
    title: [
      "ENERGY BOOSTER",
      "0 CHOLESTROL TRANS FAT",
      "HIGH PROTEIN",
      "VITAMINS & MINERALS",
      "RICH IN FIBER",
      "HEALTHY FATS",
      "WEIGHT MANAGEMENT",
    ],
    nutrients: [
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
    ],
    // description:"Unlock your coding potential and redefine software development with us.",
  },
  {
    heading: "PEANUT BUTTER",
    icon: "https://ccstechnolgy.s3.eu-north-1.amazonaws.com/TruevineProducts/0260b5df-d75c-4241-b4f5-b610b4b3e7f7.webp",
    title: [
      "ENERGY BOOSTER",
      "0 CHOLESTROL TRANS FAT",
      // "HIGH PROTEIN",
      // "VITAMINS & MINERALS",
      // "RICH IN FIBER",
      // "HEALTHY FATS",
      // "WEIGHT MANAGEMENT",
    ],
    nutrients: [
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
      {
        Nutrients: "Energy(Kcal)",
        Perserve_100g: "191",
      },
    ],
    // description:"Unlock your coding potential and redefine software development with us.",
  },
];

// const images = ["/banner1.jpg", "/baner2.webp"];
export default function HomeSubBanner() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  return (
    // <HomeSubBannerWrapper>
    //   <img src="/subbanner.jpg" alt="subbanner"/>
    //  </HomeSubBannerWrapper>
    <StyledContainer>
      <Box>
        <Typography
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "32px",
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600,
            color: "#951e76",
          }}
        >
          GoodNess oF Products
        </Typography>
      </Box>

      <Carousel
        IndicatorIcon={<CustomDotIndicator />}
        // navButtonsAlwaysVisible={false}
        indicatorIconButtonProps={{
          style: {
            backgroundColor: "rgba(103, 103, 103, 0.40)",
            display: "inline-block",
            position: "relative",
            zIndex: 999,
            width: "7%",
            height: "4px",
            borderRadius: "2px",
            margin: "0 5px",
            marginTop: "80px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: "#1967B2",
            display: "inline-block",
            position: "relative",
            zIndex: 999,
            width: "7%",
            height: "4px",
            borderRadius: "2px",
            margin: "0 5px",
            marginTop: "80px",
          },
        }}
      >
        {data.map((imageUrl, index) => (
          <Grid container sx={{ mt: 2, mb: 5 }}>
            <Grid
              item
              md={4}
              xs={12}
              sx={{
                pl: { md: "50px", xs: "0px" },
                // display: "flex",
                // textAlign: "start",
              }}
            >
              <Card sx={{ minHeight: "550px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins,sans-serif",
                      fontSize: "25px",
                      fontWeight: 600,
                      paddingLeft: "18px",
                      marginBottom: "20px",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    HEALTH BENEFITS
                  </Typography>
                </Box>
                {imageUrl?.title?.map((row, i) => (
                  // <Stack direction="row" spacing={2} mb={2}>

                  <Box>
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Poppins,sans-serif",
                          fontWeight: 500,
                          // color: "green",
                          paddingLeft: "18px",
                        }}
                      >
                        <Box data-aos="fade-up" data-aos-duration="3000">
                          {" "}
                          {row}
                        </Box>
                      </Typography>
                    </CardContent>
                  </Box>
                  // </Stack>
                ))}
              </Card>
            </Grid>
            {/* background: "#f2e3e3" */}
            <Grid item md={4} xs={12}>
              <Card sx={{ minHeight: "550px" }}>
                <Box textAlign="center" key={index}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins,sans-serif",
                        fontSize: "35px",
                        fontWeight: 600,
                        paddingLeft: "18px",
                        marginBottom: "20px",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      {imageUrl.heading}
                    </Typography>
                  </Box>
                  <Box data-aos="fade-up" data-aos-duration="3000">
                    {" "}
                    <img
                      src={imageUrl.icon}
                      style={{
                        width: "76%",
                        marginBottom: "30px",
                        textAlign: "center",
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              sx={{ textAlign: "center", pr: { md: 6, xs: 0 } }}
            >
              <Card sx={{ minHeight: "550px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins,sans-serif",
                      fontSize: "25px",
                      fontWeight: 600,
                      paddingLeft: "18px",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    NUTRITION FACTS
                  </Typography>
                </Box>

                <Box data-aos="fade-up" data-aos-duration="3000">
                  <TableContainer
                    sx={{
                      width: "90%",
                      ml: { md: 4, xs: 2 },
                    }}
                  >
                    <Table
                      sx={{
                        minWidth: 250,
                      }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Nutrients</TableCell>
                          <TableCell align="right">Per Serve(100g)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {imageUrl?.nutrients?.map((row, i) => (
                          <TableRow
                            key={row.i}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.Nutrients}
                            </TableCell>
                            <TableCell align="right">
                              {row.Perserve_100g}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </StyledContainer>
  );
}

const HomeSubBannerWrapper = styled(Box)`
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-block: 20px;
  background: url("/subbanner.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: fit;
    z-index: -10;
  }

  svg {
    color: var(--Gray-Scale-White, #fff);
    font-size: 50px;
  }
`;

const Title = styled(Typography)`
  color: var(--Gray-Scale-White, #fff);
  text-align: center;

  /* Heading 04/Heading 04 — 400 */
  font-family: Poppins;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 43.2px */
`;
