import { Box, Container, Typography, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import AOS from "aos";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
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
const images = ["/banner1.jpg", "/baner2.webp"];
export default function HomeSubBanner() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    // <HomeSubBannerWrapper>
    //   <img src="/subbanner.jpg" alt="subbanner"/>
    //  </HomeSubBannerWrapper>

    <Container
      maxWidth="lg"
      sx={{ maxWidth: { xl: "77% !important", lg: "77%" } }}
      className="oneee"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
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
            // marginTop: "20px",
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
            // marginTop: "20px",
          },
        }}
      >
        {/* <Box
          textAlign={"center"}
          onClick={() => {
            setLightboxOpen(true);
            setLightboxIndex(i);
          }}
        >
          <img
            src="/banner1.jpg"
            style={{ width: "100%", marginBottom: "30px" }}
          /> */}
        {/* <Box mt={2} mb={5}>
            <Typography variant="h5" className="plan-content">
              {row.title}
            </Typography>
          </Box> */}
        {images.map((imageUrl, index) => (
          <Box textAlign="center" key={index}>
            <img
              src={imageUrl}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </Box>
        ))}
      </Carousel>

      {/* <>
          
            <Box
              textAlign={"center"}
              key={row.id}
              // className="image-plan"
              onClick={() => {
                setLightboxOpen(true);
                setLightboxIndex(i);
              }}
            >
              <Image
                src={row.images}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                width={800}
                height={395}
                alt="plan"
              />
              <Box mt={2} mb={5}>
                <Typography variant="h5" className="plan-content">
                  {row.title}
                </Typography>
              </Box>
            </Box>
        
        </> */}
    </Container>
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
