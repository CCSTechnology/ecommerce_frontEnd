import React from "react";
import { ImagePath } from "../../../utils/helpers";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { CartBag } from "../../../helpers/images";
import imageUrl from "../../../assets/images/images_offer2.png";

export default function ProductCard({ product, addToCart }) {
  return (
    <Card to={"/product/" + product.unique_label}>
      <ImageContainer>
        <LazyImage loading="lazy" srcSet={ImagePath + product.file_name} />
        <LazyImage2 loading="lazy" src={ImagePath + product.file_name} />
      </ImageContainer>
      {product.promotion && (
        <Box
          sx={{
            // background: "#f5eded",
            position: "relative",
            bottom: "292px",
            right: "-230px",
            width: "70px",
            borderRadius: "40px",
            height: "65px",
            backgroundImage: `url(${imageUrl})`, // Use template literals to insert the URL
            backgroundSize: "cover", // Optional: Adjust background size
            backgroundPosition: "center", // Optional: Adjust background position
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "11px",
              left: "23px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {product.promotion.percentage} % OFF
          </Typography>
        </Box>
      )}
      <PriceFooter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title>{product.product_name}</Title>
          {/* <Price>₹ {Number(product.cost).toFixed(2)}</Price> */}
          {product?.promotion?.sale_price_customer &&
          product?.promotion?.sale_price_customer < product.cost ? (
            <Box>
              <ProductStrikePrice>
                ₹ {Number(product.cost).toFixed(2)}
              </ProductStrikePrice>
              <ProductPrice>
                ₹ {Number(product.promotion_cost_customer).toFixed(2)}
              </ProductPrice>
            </Box>
          ) : (
            <ProductPrice>₹ {Number(product.cost).toFixed(2)}</ProductPrice>
          )}
          <LazyImage3
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/22d01039-76ca-4fc5-9922-6b85c686924f?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          />
        </Box>
        <CartImgWrapper
          onClick={(e) => {
            e.preventDefault();
            addToCart("add", product, 1);
          }}
        >
          <img loading="lazy" srcSet={CartBag} />
        </CartImgWrapper>
      </PriceFooter>
    </Card>
  );
}

const Card = styled(Link)(({ theme }) => ({
  borderRadius: "8px",
  // boxShadow: theme.shadow[0],
  backgroundColor: "var(--gray-scale-white, #fff)",
  display: "flex",
  width: "312px",
  padding: " 0 5px",
  flexDirection: "column",

  border: `1px solid rgba(242, 242, 242, 1)`,
  ":hover": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const PriceFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const CartImgWrapper = styled(Link)(({ theme }) => ({
  background: "rgba(242, 242, 242, 1)",
  borderRadius: "50%",
  height: "40px",
  width: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid rgba(242, 242, 242, 1)`,
  ":hover": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  img: {
    objectFit: "contain",
  },
}));

const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-self: stretch;
  position: relative;
  display: flex;
  aspect-ratio: 1;
  margin-top: 5px;
  width: 100%;
  align-items: end;

  @media (max-width: 991px) {
    margin-left: 5px;
  }
`;

const LazyImage = styled("img")`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const LazyImage2 = styled("img")`
  aspect-ratio: 0.47;
  object-fit: contain;
  object-position: center;
  width: 40px;
  overflow: hidden;
  margin-bottom: 111px;
  max-width: 100%;

  @media (max-width: 991px) {
    margin: 0 -5px 40px 0;
  }
`;

const Title = styled(Box)`
  color: var(--branding-success-dark, #2c742f);
  margin-top: 22px;
  font: 400 14px/21px Poppins, sans-serif;
`;

const Price = styled(Box)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  white-space: nowrap;
  text-align: start;
  font: 500 16px/24px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const LazyImage3 = styled("img")`
  aspect-ratio: 5;
  object-fit: contain;
  object-position: center;
  width: 60px;
  align-items: flex-start;
  overflow: hidden;
  align-self: start;
  max-width: 100%;
  margin: 6px 0 15px 0px;

  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const ProductPrice = styled("span")`
  color: var(--gray-scale-gray-900, #951e76);
  align-self: stretch;
  white-space: nowrap;
  padding-right: 10px;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    margin-left: 5px;
    white-space: initial;
  }
`;
const ProductStrikePrice = styled("span")`
  color: var(--gray-scale-gray-900, #1a1a1a);
  align-self: stretch;
  white-space: nowrap;
  padding-right: 10px;
  text-decoration: line-through;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    margin-left: 5px;
    white-space: initial;
  }
`;
