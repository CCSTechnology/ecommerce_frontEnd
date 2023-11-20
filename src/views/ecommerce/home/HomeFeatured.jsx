import { Box, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/ecommerce/ProductCard";
import HomeTitle from "../../../components/ecommerce/HomeTitle";



export default function HomeFeatured() {
  const { data: HomeFeaturedData } = useSelector((state) => state.home.homeDataService)
  const products = HomeFeaturedData?.products || null
  const productList = products?.product_details || []

  return <FeaturedProductWrapper>
    <HomeTitle featured={products} />
    <HomeFeaturedList >
      {productList?.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </HomeFeaturedList>
  </FeaturedProductWrapper>
}


const FeaturedProductWrapper = styled(Box)`
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 32px;

`




const HomeFeaturedList = styled(Box)(({ }) => ({
  display : "flex",
  flexWrap : "wrap",
  gap : "10px",
  justifyContent : "center"
}))