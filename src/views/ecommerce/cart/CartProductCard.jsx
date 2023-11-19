import React from "react";
import styled from "styled-components";
import QuantityComponent from "../../../components/QuantityComponent";
import { Button } from "@mui/material";

export default function CartProductCard(props) {
  return (
    <Container>
      <Image loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/06193402-92be-478d-81ac-503d8d5774b9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
      <Title>Green Capsicum</Title>
      <QuantityComponent />
      <PriceContainer>
        <Price>$14.99</Price>
        <DiscountPrice>$20.99</DiscountPrice>
      </PriceContainer>
      <StockContainer>
        <StockStatus>In Stock</StockStatus>
        <AddToCartButton variant="contained">
            Remove
        </AddToCartButton>
      </StockContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Image = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 100px;
  overflow: hidden;
  max-width: 100%;
`;

const Title = styled.div`
  color: var(--gray-scale-gray-900, #1a1a1a);
  align-self: center;
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font: 400 16px/24px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const PriceContainer = styled.div`
  align-self: center;
  display: flex;
  gap: 2px;
  margin: auto 0;
  padding: 0 20px;
`;

const Price = styled.div`
  color: var(--gray-scale-gray-900, #1a1a1a);
  font: 500 16px/24px Poppins, sans-serif;
`;

const DiscountPrice = styled.div`
  color: var(--gray-scale-gray-400, #999);
  text-decoration-line: strikethrough;
  white-space: nowrap;
  font: 400 16px/24px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StockContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: auto 0;
`;

const StockStatus = styled.div`
  color: var(--branding-success-dark, #2c742f);
  white-space: nowrap;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(32, 181, 38, 0.2);
  aspect-ratio: 2.4482758620689653;
  margin: auto 0;
  padding: 4px 8px;
  font: 400 14px/21px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const AddToCartButton = styled(Button)`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 43px;
  background-color: var(--branding-success, #00b207);
  flex-grow: 1;
  padding: 14px 20px;
  font: 600 14px/17px Poppins, sans-serif;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const CartIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  overflow: hidden;
  align-self: center;
  max-width: 100%;
  margin: auto 0;
`;