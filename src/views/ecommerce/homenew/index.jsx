import { Box, Container, styled } from "@mui/material";
import React, { useEffect } from "react";

import HeaderNew from "../../../layouts/public/HeaderNew";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import StyledContainerNew from "../../../components/ecommerce/StyledContainernew";
import PublicFooter from "../../../layouts/public/PublicFooterNew";
import HomeBannerNew from "./HomeBannerNew";
import HomeFeaturedNew from "./HomeFeaturedNew";
import HomeDesignNew from "./HomeDesignNew";
import OurProducts from "./OurProducts";
import PlainBlock from "./PlainBlock";
import BestSeller from "./BestSeller";
import Testimonial from "./Testimonoial";
import FinalSection from "./FinalSection";
import { useDispatch } from "react-redux";
import { homeDataService } from "../../../redux/api/public/homeService";
import HomeDelivery from "../home/HomeDelivery";
import HomeAboutUs from "../home/HomeAboutUs";

export default function HomeNew() {
  const dispatch = useDispatch();
  const HomeApi = async () => {
    try {
      const res = await dispatch(homeDataService()).unwrap();
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    HomeApi();
  }, []);
  return (
    <Box>
      <HomeBannerNew />
      <StyledContainerNew>
        {/* <HeaderNew /> */}

        <HomeFeaturedNew />
        <HomeDesignNew />
        <OurProducts />
        {/* <PlainBlock /> */}
        <HomeAboutUs />
        <BestSeller />
        {/* <Testimonial /> */}

        {/* <PublicFooter /> */}
      </StyledContainerNew>
      <FinalSection />
    </Box>
  );
}
