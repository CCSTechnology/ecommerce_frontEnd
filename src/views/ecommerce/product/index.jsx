import { Box, Button, Typography, styled } from "@mui/material"
import CustomBreadcrumbs from "../../../components/ecommerce/Breadcrumps"
import StyledContainer from "../../../components/ecommerce/StyledContainer"
import { productListService } from "../../../redux/api/public/productService"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ProductSlides from "./ProductSlides"


const CartComponent = () => {
    return  <>
        <CartComponentWrapper>
            <QuantityComponent />
            <AddToCart />
        </CartComponentWrapper>
        <Divider />
    </>
}


const CartComponentWrapper = styled(Box)`

display: flex; 
gap: 10px;

`

const Product = () => {
    const dispatch = useDispatch()
    const { data: productData } = useSelector((state) => state.product.productListService)
    const productSingle = productData?.data?.[0] || null
    console.log(productSingle, "productSingle")
    function fetchProduct(params) {
        dispatch(productListService())
    }

    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <StyledContainer>
            <ProductWrapper>
                <CustomBreadcrumbs />
                <ProductContainer>
                    <ProductSlider>
                        <ProductSlides />
                    </ProductSlider>
                    <ProductDetails >
                        <VegetableCard product={productSingle} />
                        <UpdatedComponent product={productSingle} />
                        <CartComponent />
                    </ProductDetails>
                </ProductContainer>
                
            </ProductWrapper>
        </StyledContainer>
    )
}

export default Product


const ProductContainer = styled(Box)`

display: flex;
padding: 20px;
height: 600px;
gap: 10px;
 `

const ProductWrapper = styled(Box)`
`

const ProductSlider = styled(Box)`
width: 100%;
flex :1;
max-width: 50%;

`

const ProductDetails = styled(Box)`
flex: 1;
display: flex;
flex-direction: column;
gap: 20px;
padding: 0 20px;
justify-content: space-between;
`





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
                    <Label>SKU:</Label>
                    <Value>2,51,594</Value>
                </SKU>
            </Details>
            <Price>
                <OriginalPrice>₹ 48.00</OriginalPrice>
                <DiscountedPrice>₹ {Number(product?.cost).toFixed(2)}</DiscountedPrice>
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
  align-items : center;
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

const LazyImage = styled('img')`
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
                <Brand>Sizes:</Brand>

                {/* <BrandName>farmary</BrandName> */}
            </UpdatedComponentHeader>
            {/* <ShareSection>
        <ShareLabel>Share item:</ShareLabel>
        <ShareIcons>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73a243a3-a8c6-402b-9b36-0278f23163a0?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            alt="Share Icon 1"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/10803ad7-f84b-4d73-8070-0a996990015b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            alt="Share Icon 2"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73166ff8-9878-4e12-b8a9-9091e7995ece?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            alt="Share Icon 3"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b664306-d402-4105-bc67-a3b3117d24a6?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            alt="Share Icon 4"
          />
        </ShareIcons>
      </ShareSection> */}
            <Content>
                {product?.description}
            </Content>
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

const Logo = styled(Box)`
  border-radius: 4px;
  border: 0.8px solid var(--gray-scale-gray-100, #e6e6e6);
  background-color: var(--gray-scale-white, #fff);
  align-self: stretch;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
`;

const BrandName = styled(Box)`
  color: #555;
  align-self: stretch;
  margin-top: 4px;
  white-space: nowrap;
  font: 700 13px/13px Dancing Script, -apple-system, Roboto, Helvetica,
    sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const ShareSection = styled(Box)`
  align-items: center;
  align-self: center;
  display: flex;
  gap: 10px;
  margin: auto 0;
  padding: 0 20px;
`;

const ShareLabel = styled(Box)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  margin: auto 0;
  font: 400 14px/21px Poppins, sans-serif;
`;

const ShareIcons = styled(Box)`
  align-self: stretch;
  display: flex;
  gap: 5px;

  @media (max-width: 991px) {
    justify-content: center;
  }
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


const QuantityComponent = () => {
    return <QuantityComponentWrapper>
        <ADDMINUS>-</ADDMINUS>
        <Input>1</Input>
        <ADDMINUS>+</ADDMINUS>
    </QuantityComponentWrapper>
}

const QuantityComponentWrapper = styled(Box)`
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
width: 108px;
border-radius: 170px;
border: 1px solid var(--gray-scale-gray-100, #E6E6E6);
background: var(--gray-scale-white, #FFF);

`

const ADDMINUS = styled(Box)`
  background: var(--gray-scale-gray-50, #F2F2F2); 
  width: 34px;
    height: 34px; 
    border-radius: 170px;
    display: flex;
  align-items:  center;
  justify-content: center;
  cursor: pointer;
`
const Input = styled('p')`
outline: none;
border: none;
display: flex;
justify-content: center;
background: transparent;
width: 20px;

`

const AddToCart = () => {
    return <AddToCartWrapper fullWidth variant="contained"> Add to Cart</AddToCartWrapper>
}


const AddToCartWrapper = styled(Button)`

    color: white;
    border-radius: 170px;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 19.2px */ 
`
