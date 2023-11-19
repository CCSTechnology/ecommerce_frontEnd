import React from "react";
import styled from "styled-components";
import { ImagePath } from "../../../utils/helpers";

export default function ProductCard({product}) {
  return (
    <Card>
      <ImageContainer>
        <LazyImage loading="lazy"
      srcSet={ImagePath + product.file_name} />
        <LazyImage2
          loading="lazy"
          src={ImagePath + product.file_name}
        //   src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d3b2298-eb66-4ccb-bc00-ae09e1990ca3?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
        />
      </ImageContainer>
      <Title>{product.product_name}</Title>
      <Price>${Number(product.cost).toFixed(2)}</Price>
      <LazyImage3
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/22d01039-76ca-4fc5-9922-6b85c686924f?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
      />
    </Card>
  );
}

const Card = styled.div`
  border-radius: 8px;
  border: 1px solid var(--branding-success-dark, #2c742f);
  box-shadow: 0px 0px 12px 0px rgba(32, 181, 38, 0.32);
  background-color: var(--gray-scale-white, #fff);
  display: flex;
  width: 312px;
  padding: 0 5px;
  flex-direction: column;
`;

const ImageContainer = styled.div`
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

const LazyImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const LazyImage2 = styled.img`
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

const Title = styled.div`
  color: var(--branding-success-dark, #2c742f);
  margin-top: 22px;
  font: 400 14px/21px Poppins, sans-serif;
`;

const Price = styled.div`
  color: var(--gray-scale-gray-900, #1a1a1a);
  align-self: center;
  white-space: nowrap;
  font: 500 16px/24px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const LazyImage3 = styled.img`
  aspect-ratio: 5;
  object-fit: contain;
  object-position: center;
  width: 60px;
  align-items: flex-start;
  overflow: hidden;
  align-self: start;
  max-width: 100%;
  margin: 6px 0 15px 16px;

  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;
