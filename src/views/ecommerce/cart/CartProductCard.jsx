import React, { useState } from "react";
import styled from "styled-components";
import QuantityComponent from "../../../components/QuantityComponent";
import { Button } from "@mui/material";
import { ImagePath } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { errorAlert } from "../../../helpers/globalFunctions";
import { removeCartServices } from "../../../redux/api/public/cartServices";

export default function CartProductCard({
  product,
  quantityShow = true,
  finishApi,
}) {
  const dispatch = useDispatch();
  const count = product?.quantity || 1;
  const [quantity, setQuantity] = useState(count);
  async function removeCart(id) {
    try {
      await dispatch(removeCartServices(id)).unwrap();
      await finishApi();
    } catch (error) {
      finishApi();
      errorAlert(error?.error);
    }
  }

  return (
    <Container>
      <Image loading="lazy" srcSet={ImagePath + product.products.file_name} />
      <Title>{product.products.product_name}</Title>
      {quantityShow && (
        <QuantityComponent
          product={product || null}
          setQuantity={setQuantity}
          quantity={quantity}
          finishApi={finishApi}
        />
      )}

      <PriceContainer>
        <Price>₹ {product.total_amount}</Price>
        {/* <DiscountPrice>$20.99</DiscountPrice> */}
      </PriceContainer>
      <StockContainer>
        <StockStatus>In Stock</StockStatus>
        <AddToCartButton
          variant="contained"
          onClick={() => {
            removeCart(product.id);
          }}
        >
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
  padding: 5px;

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
