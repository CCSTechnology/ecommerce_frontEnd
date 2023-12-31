import { Box, Grid, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import HomeTitle from "../../../components/ecommerce/HomeTitle";
import AOS from "aos";
import "aos/dist/aos.css";
export default function HomeAboutUs() {
  const { data: HomeData } = useSelector((state) => state.home.homeDataService);
  const aboutUs = HomeData?.about_us || null;
  console.log(aboutUs, "ab");
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <StyledContainer>
      <HomeAboutUsWrapper>
        <HomeTitle
          featured={{
            title: "About Us",
          }}
          link={false}
        />
      </HomeAboutUsWrapper>

      {/* <HomeAboutUsWrapper>
        <AboutUs>
          <Title>{aboutUs?.title || ""}</Title>
          <HomeAboutUsContent
            dangerouslySetInnerHTML={{
              __html: aboutUs?.data,
            }}
          />
        </AboutUs>
        <AboutUs>
          <img src="https://ccstechnolgy.s3.eu-north-1.amazonaws.com/TruevineProducts/0e4ff2f4-a09c-4a43-8cde-f7e13a3821f4.webp" />
        </AboutUs>
      </HomeAboutUsWrapper> */}
      <Box
        data-aos="fade-up"
        data-aos-duration="3000"
        className="lg-carosil"
        mt={6}
      >
        {" "}
        <Grid container sx={{ mb: 4 }}>
          <Grid md={6} xs={12}>
            <Title sx={{ textAlign: { xs: "center" } }}>
              {aboutUs?.title || ""}
            </Title>
            <HomeAboutUsContent
              dangerouslySetInnerHTML={{
                __html: aboutUs?.data,
              }}
              sx={{
                p: { xs: "20px", md: "0px" },
                pr: { md: "30px" },
                pl: { md: "39px" },
              }}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <img
              src="https://ccstechnolgy.s3.eu-north-1.amazonaws.com/TruevineProducts/0e4ff2f4-a09c-4a43-8cde-f7e13a3821f4.webp"
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>
  );
}

const HomeAboutUsWrapper = styled(Box)`
  padding-inline: 20px;
  display: flex;
  margin-bottom: 32px;
  gap: 32px;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 60px;
  margin-bottom: 40px;
`;
const HomeAboutUsContent = styled("div")`
  margin-top: 20px;
  text-align: justify;
  font-size: 18px;
`;

const AboutUs = styled(Box)`
  flex: 1;
  width: 50%;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const Title = styled(Typography)`
  color: #951e76;
  flex-grow: 1;
  flex-basis: auto;
  text-transform: capitalize;
  font: 600 32px/38px Poppins, sans-serif;
`;
