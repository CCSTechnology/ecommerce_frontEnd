import { Box, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QuantityComponent from "../../../components/QuantityComponent";
import CustomBreadcrumbs from "../../../components/ecommerce/Breadcrumps";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import { errorAlert } from "../../../helpers/globalFunctions";
import {
  addCartServices,
  cartViewServices,
  guestAddCartServices,
} from "../../../redux/api/public/cartServices";
import { productViewService } from "../../../redux/api/public/productService";
import ProductSlides from "./ProductSlides";
import ProductDetailTab from "./ProductDetailsTab";
import RelatedProduct from "./RelatedProduct";
import { breadCrumbsCapitalize } from "../../../utils/helpers";

const CartComponent = ({ count = 1, product = null, finishApi }) => {
  const [quantity, setQuantity] = useState(count);

  const token = localStorage.getItem("public_token") || null;
  const cart_id = localStorage.getItem("cart_id") || null;

  const dispatch = useDispatch();
  const addToCart = async (type = "add") => {
    const message =
      type === "add"
        ? "Product added successfully"
        : "Product reduced successfully";
    if (token) {
      try {
        await dispatch(
          addCartServices({
            product_id: product?.id,
            quantity,
            type,
          })
        ).unwrap();
        finishApi();

        toast.success(message);
      } catch (error) {
        errorAlert(error?.error);
      } finally {
        dispatch(
          cartViewServices({
            cart_id,
          })
        );
      }
    } else {
      try {
        const response = await dispatch(
          guestAddCartServices({
            cart_id,
            product_id: product?.id,
            quantity,
            type,
          })
        ).unwrap();
        finishApi();
        if (response?.cartdetails) {
          localStorage.setItem("cart_id", response?.cartdetails.cart_id);
        }
        toast.success(message);
      } catch (error) {
        errorAlert(error?.error);
      } finally {
        dispatch(
          cartViewServices({
            cart_id,
          })
        );
      }
    }
  };

  return (
    <>
      <CartComponentWrapper>
        <QuantityComponent
          product={product}
          quantity={quantity}
          cartType="product"
          setQuantity={setQuantity}
          finishApi={finishApi}
        />
        <AddToCart product={product} addToCart={addToCart} />
        <BuyNow product={product} addToCart={addToCart} quantity={quantity} />
      </CartComponentWrapper>
      <Divider />
    </>
  );
};

const CartComponentWrapper = styled(Box)`
  display: flex;
  gap: 10px;
`;

const Product = () => {
  const dispatch = useDispatch();
  const { productSlug } = useParams();
  const [productSingle, setProductSingle] = useState(null);
  const [relatedProduct, setRelatedPodct] = useState([]);
  const breadcrumbs = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: productSingle?.categoryname || "Category",
      link: "/category/" + productSingle?.categoryname || "all",
    },
    {
      label: breadCrumbsCapitalize(productSlug),
    },
  ];

  async function fetchProduct(unique_label) {
    try {
      const response = await dispatch(
        productViewService({
          unique_label,
        })
      ).unwrap();
      setProductSingle(response?.product);
      setRelatedPodct(response?.related_product);
    } catch (error) {}
  }
  useEffect(() => {
    fetchProduct(productSlug);
  }, [productSlug]);
  return (
    <StyledContainer>
      <ProductWrapper>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <ProductContainer>
          <ProductSlider>
            <ProductSlides product={productSingle} />
          </ProductSlider>
          <ProductDetails>
            <VegetableCard product={productSingle} />
            <UpdatedComponent product={productSingle} />
            <CartComponent
              product={productSingle}
              finishApi={() => fetchProduct(productSlug)}
            />
          </ProductDetails>
        </ProductContainer>
        <ProductDetailTab />
        <RelatedProduct relatedProduct={relatedProduct} />
      </ProductWrapper>
    </StyledContainer>
  );
};

export default Product;

const ProductContainer = styled(Box)`
  display: flex;
  padding: 20px;
  height: 600px;
  gap: 10px;
  margin-bottom: 20px;
`;

const ProductWrapper = styled(Box)``;

const ProductSlider = styled(Box)`
  width: 100%;
  flex: 1;
  max-width: 50%;
`;

const ProductDetails = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  justify-content: space-between;
`;

function VegetableCard({ product }) {
  return (
    <>
      <Card>
        <Header>
          <Title>{product?.product_name}</Title>
          <Status>In Stock</Status>
        </Header>
        <Images>
          <LazyImage
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c01ddc69-c87d-4fa9-bdf3-cde42678a7ef?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          />
          <LazyImage
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f88450d-b5d8-4d2a-9ea1-af9eaeb74c61?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          />
          <LazyImage
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/afc1a752-946c-44e4-ae33-7a96763aeb71?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          />
          <LazyImage
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d88ea37e-2886-48a4-97e6-f5d1f9c9dcf2?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          />
          <LazyImage
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7ddeec8-c97f-414b-8187-57bc6914a9d5?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          />
          <ReviewCount>4 Review</ReviewCount>
        </Images>
        <Details>
          <SKU>
            <Label>SKU: {product?.sku}</Label>
            <Value>2,51,594</Value>
          </SKU>
        </Details>
        <Price>
          {product?.promotion_cost_customer &&
          product?.promotion_cost_customer < product?.cost ? (
            <>
              <OriginalPrice>
                ₹ {Number(product?.cost).toFixed(2)}
              </OriginalPrice>
              <DiscountedPrice>
                ₹ {Number(product?.promotion_cost_customer).toFixed(2)}
              </DiscountedPrice>
            </>
          ) : (
            <DiscountedPrice>
              ₹ {Number(product?.cost).toFixed(2)}
            </DiscountedPrice>
          )}
        </Price>
      </Card>
      <Divider />
    </>
  );
}

const Card = styled(Box)`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

const Title = styled(Box)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  font: 600 36px/43px Poppins, sans-serif;
  text-transform: uppercase;
`;

const Status = styled(Box)`
  color: var(--branding-success-dark, #2c742f);
  white-space: nowrap;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(32, 181, 38, 0.2);
  align-self: center;
  aspect-ratio: 2.4482758620689653;
  margin: auto 0;
  padding: 4px 8px;
  font: 400 14px/21px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Images = styled(Box)`
  align-self: start;
  display: flex;
  margin-top: 12px;
  width: 409px;
  max-width: 100%;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const LazyImage = styled("img")`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 18px;
  overflow: hidden;
  align-self: start;
  max-width: 100%;
`;

const ReviewCount = styled(Box)`
  color: var(--gray-scale-gray-600, #666);
  align-self: stretch;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Details = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const SKU = styled(Box)`
  color: var(--gray-scale-gray-800, #333);
  font: 500 14px/21px Poppins, sans-serif;
  margin-top: 12px;
`;

const Label = styled(Box)`
  color: var(--gray-scale-gray-800, #333);
  font: 500 14px/21px Poppins, sans-serif;
`;

const Value = styled(Box)`
  color: var(--gray-scale-gray-600, #666);
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Price = styled(Box)`
  align-self: start;
  display: flex;
  margin-top: 20px;
  width: 230px;
  max-width: 100%;
  gap: 12px;
`;

const OriginalPrice = styled(Box)`
  /* color: var(--gray-scale-gray-300, #b3b3b3); */
  color: #e10000;
  text-decoration-line: line-through;
  margin: auto 0;
  font: 400 20px/30px Poppins, sans-serif;
`;

const DiscountedPrice = styled(Box)`
  color: var(--branding-success-dark, #2c742f);
  align-self: stretch;
  white-space: nowrap;
  font: 500 24px/36px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Divider = styled(Box)`
  background-color: #e6e6e6;
  align-self: stretch;
  min-height: 1px;
  margin-top: 19px;
  width: 100%;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

function UpdatedComponent({ product }) {
  return (
    <Container>
      <UpdatedComponentHeader>
        <Brand>Description: </Brand>
      </UpdatedComponentHeader>
      <Content>{product?.description}</Content>
      <Divider />
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UpdatedComponentHeader = styled(Box)`
  display: flex;
  gap: 20px;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Brand = styled(Box)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  margin: auto 0;
  font: 400 14px/21px Poppins, sans-serif;
`;

const Content = styled(Box)`
  color: var(--gray-scale-gray-500, #808080);
  margin-top: 16px;
  width: 100%;
  font: 400 14px/21px Poppins, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AddToCart = ({ addToCart }) => {
  return (
    <AddToCartWrapper
      fullWidth
      variant="contained"
      onClick={() => {
        addToCart("add");
      }}
    >
      {" "}
      Add to Cart
    </AddToCartWrapper>
  );
};

const AddToCartWrapper = styled(Button)`
  color: white;
  border-radius: 170px;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 19.2px */
`;

const BuyNow = ({ addToCart, product }) => {
  const navigate = useNavigate();

  async function BuyNowApi(e) {
    await addToCart("add");
    navigate("/checkout");
  }

  return (
    <BuyNowWrapper fullWidth variant="contained" onClick={BuyNowApi}>
      {" "}
      BuyNow
    </BuyNowWrapper>
  );
};

const BuyNowWrapper = styled(Button)`
  color: white;
  border-radius: 170px;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 19.2px */
`;
