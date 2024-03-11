import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Grid, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ImagePath } from "../../../utils/helpers";

const OrderedProduct = React.memo(function Product({ product = null }) {
  return (
    <OrderedProductsWrapper container justifyContent={"space-between"}>
      <Grid item md={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Image
            loading="lazy"
            srcSet={ImagePath + product.products.file_name}
          />
          <Title>{product?.products?.product_name}</Title>
        </Box>
      </Grid>
      <OrderedProductsItem item md={4}>
        <Quantity>{product.quantity}</Quantity>
      </OrderedProductsItem>
      <OrderedProductsItem item md={4}>
        <Price>₹ {product.amount}</Price>
      </OrderedProductsItem>
    </OrderedProductsWrapper>
  );
});

const Image = styled("img")`
  height: 60px;
  width: 60px;
  object-fit: contain;
`;

const OrderedProductsWrapper = styled(Grid)`
  margin-block: 10px;
`;

const OrderedProductsItem = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Title = styled("p")``;
const Quantity = styled("span")``;
const Price = styled("span")``;

export default React.memo(function OrderSummary({
  checkout,
  guest,
  handleCheckOutGuest,
  handleCheckOut,
  handleSubmit,
  loading,
  delivery,
}) {
  const products = checkout?.details || [];
  const navigate = useNavigate();
  const amount = delivery?.amount || 0;
  return (
    <OrderSummaryWrapper>
      <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
      <Box sx={{}}>
        {products.map((product) => {
          return <OrderedProduct product={product} />;
        })}
      </Box>
      <Divider />
      <Box>
        <OrderAmountWrapper>
          <Typography>Subtotal:</Typography>
          <span>₹ {Number(checkout?.total_amount || 0).toFixed(2)}</span>
        </OrderAmountWrapper>
        <OrderAmountWrapper>
          <Typography>Shipping:</Typography>
          <span>₹ {Number(delivery?.amount || 0).toFixed(2)}</span>
        </OrderAmountWrapper>
        <OrderAmountWrapper>
          <Typography>Total:</Typography>
          <span>
            ₹ {Number(checkout?.grand_total + amount || 0).toFixed(2)}
          </span>
        </OrderAmountWrapper>
      </Box>
      <ButtonWrapper>
        {/* {guest === true ? ( */}
        <form onSubmit={handleSubmit(handleCheckOutGuest)}>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            disabled={true}
          >
            Guest Check out
          </LoadingButton>
        </form>
        {/* ) : ( */}
        {/* <form onSubmit={handleSubmit(handleCheckOut)}>
            <Button type="submit" variant="contained">
              Check out
            </Button>
          </form> */}
        {/* )} */}
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Continue Shopping
        </Button>
      </ButtonWrapper>
    </OrderSummaryWrapper>
  );
});

const OrderSummaryWrapper = styled("section")(() => ({
  width: "100%",
  height: "100%",
  padding: "12px 20px",
}));

const OrderSummaryTitle = styled(Box)(() => ({
  color: "var(--gray - scale - gray - 900, #1A1A1A)",

  /* Body XL/Body XL, 500 */
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "150%" /* 30px */,
}));

const OrderAmountWrapper = styled(Box)`
  display: flex;
  width: 100%;
  /* margin: 0 80px 0 0; */
  /* width: 376px; */
  padding: 12px 0px;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  p {
    color: var(--gray-scale-gray-700, #4d4d4d);

    /* Body Small/Body Small, 400 */
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
  }

  span {
    color: var(--gray-scale-gray-900, #1a1a1a);

    /* Body Small/Body Small, 500 */
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
  }
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  gap: 10px;
`;
