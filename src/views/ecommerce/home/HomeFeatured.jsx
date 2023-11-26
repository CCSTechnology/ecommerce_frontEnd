import { Box, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/ecommerce/ProductCard";
import HomeTitle from "../../../components/ecommerce/HomeTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';



export default function HomeFeatured() {
  const { data: HomeFeaturedData } = useSelector((state) => state.home.homeDataService)
  const products = HomeFeaturedData?.products || null
  const productList = products?.product_details || []

  return <FeaturedProductWrapper>
    <HomeTitle featured={products} />
    <HomeFeaturedList
      spaceBetween={30}
      slidesPerView={4}
      autoplay={{
        waitForTransition: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      loop
      modules={[Autoplay]}>
      {productList.map((product) => {
        return <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      })}
    </HomeFeaturedList>
  </FeaturedProductWrapper>
}


const FeaturedProductWrapper = styled(Box)`
        padding-inline: 20px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 32px;

`




const HomeFeaturedList = styled(Swiper)(({ }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "30px 20px",
  width : "100vw"
}))

