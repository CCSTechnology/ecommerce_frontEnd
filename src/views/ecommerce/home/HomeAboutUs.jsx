import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import HomeTitle from "../../../components/ecommerce/HomeTitle";

export default function HomeAboutUs() {
  const { data: HomeData } = useSelector((state) => state.home.homeDataService);
  const aboutUs = HomeData?.about_us || null;
  console.log(aboutUs, "ab");
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

      <HomeAboutUsWrapper>
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
      </HomeAboutUsWrapper>
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
