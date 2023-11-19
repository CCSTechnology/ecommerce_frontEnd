import { Box, styled } from "@mui/material";
import React from "react";
import { ImagePath } from "../../utils/helpers";


function ProductCard({ product }) {
  return (
    <ProductCardWrapper>
      <ProductImage srcSet={ImagePath + product.file_name} />
      <ProductName>{String(product.product_name)}</ProductName>
      <ProductPrice>${Number(product.cost).toFixed(2)}</ProductPrice>
      {/* <LazyImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fff469ad-32cf-4db1-abf5-2751b2e40a7f?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" /> */}
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


const ProductCardWrapper = styled(Box)(({theme})=>({
  border : `1px solid ${theme.palette.grey[100]}`,
  display: "flex",
  flexDirection : "column",
  borderRadius : "5px",
  width : "264px",
  padding : "0 5px",
  cursor : "pointer",
  ":hover" :{
    boxShadow :theme.shadows[0],
    border : `1px solid ${theme.palette.primary.main}`,
    " p" :{
      fontWeight :"600",
      color : theme.palette.primary.main 
    }
  }

}))


const ProductImage = styled('img')`
width: 254px;
height: 230px; 
padding: 5px;
`

const ProductName = styled('p')`
  align-self: stretch;
  margin-top: 18px;
  width: 100%;
  font-weight :"600";
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    margin-left: 5px;
  }
`;

const ProductPrice = styled('span')`
  color: var(--gray-scale-gray-900, #1a1a1a);
  align-self: stretch;
  white-space: nowrap;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    margin-left: 5px;
    white-space: initial;
  }
`;

export default ProductCard;