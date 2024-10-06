import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import HomeTitle from "../../../components/ecommerce/HomeTitle";
import AOS from "aos";
import "aos/dist/aos.css";
import { About } from "../../../helpers/images";
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
      <Box sx={{ backgroundColor: "white" }}>
        {" "}
        <HomeAboutUsWrapper>
          {/* <HomeTitle
            featured={{
              title: "About Us",
            }}
            link={false}
          /> */}
          <p className="our-products-new1">ABOUT US</p>
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
          // mt={6}
        >
          {" "}
          <Grid container>
            <Grid
              md={6}
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                direction={"column"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Title sx={{ textAlign: { xs: "center" } }}>
                  {aboutUs?.title || ""}
                </Title>

                <HomeAboutUsContent
                  // dangerouslySetInnerHTML={{
                  //   __html: aboutUs?.data,
                  // }}
                  sx={{
                    p: { xs: "20px", md: "0px" },
                    pr: { md: "30px" },
                    pl: { md: "39px" },
                  }}
                >
                  Truevine Foods was born out of passion to deliver a genuine
                  and non-diluted food products by retaining its original
                  qualities and reaching out to the consumers with the product
                  known for its true and original taste. We aim to build a brand
                  which wins the trust of the consumers for its originality and
                  purity. Truevine was started with its humble beginning by
                  converting our residence into a small makeshift office and all
                  the ideas and planning take place here before being actually
                  converted in to reality. We believe food is an expression of
                  emotions and love when cooked with passion and that’s why we
                  continue to strive hard by identifying regional markets and
                  researching on various spices and reaching out to the best and
                  original ingredients which as part of the process can add more
                  value to the final product that we develop and stands for the
                  values that we believe on which of our company is found.
                </HomeAboutUsContent>
              </Stack>
            </Grid>
            <Grid
              md={6}
              xs={12}
              sx={{
                dispaly: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, md: 0 },
              }}
            >
              <img
                // src="https://ccstechnolgy.s3.eu-north-1.amazonaws.com/TruevineProducts/0e4ff2f4-a09c-4a43-8cde-f7e13a3821f4.webp"
                src={About}
                style={{
                  width: "98%",
                  marginBottom: "30px",
                  borderRadius: "33px",
                  marginTop: "30px",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledContainer>
  );
}

const HomeAboutUsWrapper = styled(Box)`
  padding-inline: 20px;
  display: flex;

  gap: 32px;
  justify-content: center;
  align-items: center;
  height: 100%;
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
