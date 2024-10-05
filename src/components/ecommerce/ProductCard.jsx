import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { ImagePath } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { CartBag } from "../../helpers/images";
import imageUrl from "../../assets/images/images_offer2.png";

function ProductCard({ product, addToCart }) {
  console.log(product, "product");
  return (
    <ProductCardWrapper to={"/product/" + product.unique_label}>
      <ProductImage srcSet={ImagePath + product.file_name} />
      {product?.promotion && (
        <Box
          sx={{
            // background: "#f5eded",
            position: "absolute",
            // bottom: "230px",
            // right: "-190px",
            top: "15px",
            right: "80px",
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
      <ProductFooter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <ProductName>{String(product.product_name)}</ProductName>
          {product?.promotion_cost_customer &&
          product?.promotion_cost_customer < product.cost ? (
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
        </Box>
        <CartImgWrapper
          onClick={(e) => {
            e.preventDefault();
            addToCart("add", product, 1);
          }}
        >
          <img loading="lazy" srcSet={CartBag} />
        </CartImgWrapper>
      </ProductFooter>
    </ProductCardWrapper>
  );
}

const Card = styled(Box)`
  border: 1px solid var(--branding-success-dark, #2c742f);
  box-shadow: 0px 0px 12px 0px rgba(32, 181, 38, 0.32);
  display: flex;
  width: 264px;
  padding: 0 5px;
  flex-direction: column;
`;

const ProductCardWrapper = styled(Link)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[100]}`,
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
  width: "264px",
  padding: "5px",
  cursor: "pointer",
  ":hover": {
    boxShadow: theme.shadows[0],
    border: `1px solid ${theme.palette.primary.main}`,
    " p": {
      fontWeight: "600",
      color: theme.palette.primary.main,
    },
  },
}));

const ProductImage = styled("img")`
  width: 254px;
  height: 312px;
  padding: 5px;
`;

const ProductName = styled("p")`
  align-self: stretch;
  margin-top: 18px;
  width: 100%;
  font-weight: "600";
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    margin-left: 5px;
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

const ProductFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartImgWrapper = styled(Box)(({ theme }) => ({
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

export default ProductCard;
