import { Box, styled } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import { useDispatch, useSelector } from 'react-redux'
import { productListService } from '../../../redux/api/public/productService'
import ProductCard from './ProductsCard'
import { addCartServices, cartViewServices, guestAddCartServices } from '../../../redux/api/public/cartServices'
import { toast } from 'react-toastify'
import { errorAlert } from '../../../helpers/globalFunctions'

const Products = () => {
    const dispatch = useDispatch()
    const { data: productData } = useSelector((state) => state.product.productListService)
    const productsList = productData?.data || []
    const breadcrumbs = [{
        label: "Home",
        link: '/',
    }, {
        label: "Category",
        link: "/category/" + "all",

    }]
    function fetchProduct(params) {
        dispatch(productListService())
    }
    const addToCart = useCallback(async (type = "add", product, quantity = 1) => {
        const cart_id = localStorage.getItem("cart_id") || null
        const token = localStorage.getItem("public_token") || null

        const message = "Product added successfully"
        if (token) {
            try {
                await dispatch(addCartServices({
                    product_id: product?.id,
                    quantity,
                    type,
                })).unwrap()

                toast.success(message)
            } catch (error) {
                errorAlert(error?.error)
            } finally {
                dispatch(cartViewServices({
                    cart_id
                }))
            }
        } else {
            try {
                const response = await dispatch(guestAddCartServices({
                    cart_id,
                    product_id: product?.id,
                    quantity,
                    type
                })).unwrap()
                if (response?.cartdetails) {
                    localStorage.setItem('cart_id', response?.cartdetails.cart_id)
                }
                toast.success(message)
            } catch (error) {
                errorAlert(error?.error)
            }
            finally {
                dispatch(cartViewServices({
                    cart_id
                }))
            }
        }
    }, [])

    useEffect(() => {
        fetchProduct()
    }, [])
    return (
        <StyledContainer>
            <ProductsWrapper>
                <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
                <ProductsContainer>
                    <FilterComponent length={productsList?.length || 0} />
                    <ProdductList>
                        {productsList.map((product) => {
                            return <ProductCard product={product} key={product.id} addToCart={addToCart} />
                        })}
                    </ProdductList>
                </ProductsContainer>
            </ProductsWrapper>
        </StyledContainer>
    )
}

export default Products




function FilterComponent({length}) {
    return (
        <Container>
            <FilterContainer>
                <FilterText>Filter</FilterText>
                <LazyImage
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba923a3f-a851-48cf-ab12-d5f7ba5290bb?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
                />
            </FilterContainer>
            <SortContainer>
                <SortText>Sort by:</SortText>
                <SortOption>
                    <SortOptionText>Latest</SortOptionText>
                    <LazyImage
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0639f583-9a9f-412d-90f4-93141bae4117?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
                    />
                </SortOption>
            </SortContainer>
            <ResultText>
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: "rgba(26,26,26,1)" }}>
                    {length}
                </span>
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, color: "rgba(26,26,26,1)" }}>
                    {" "}
                </span>
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, color: "rgba(102,102,102,1)" }}>
                    Results Found
                </span>
            </ResultText>
        </Container>
    );
}


const ProductsWrapper = styled(Box)(({ }) => ({
}))

const ProdductList = styled(Box)(({ }) => ({
    display: 'flex',
    padding: "20px 20px",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "34px"
}))

const ProductsContainer = styled(Box)(({ }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",

}))

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
  width:  100%;
  
  
  @media (max-width: 991px) {
      flex-wrap: wrap;
    }
    `;

const FilterContainer = styled(Box)`
  justify-content: space-between;
  border-radius: 43px;
  background-color: var(--branding-success, #00b207);
  display: flex;
  gap: 12px;
  padding: 14px 32px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const FilterText = styled(Box)`
  color: var(--gray-scale-white, #fff);
  font: 600 14px/17px Poppins, sans-serif;
`;

const LazyImage = styled('img')`
  aspect-ratio: 1.18;
  object-fit: contain;
  object-position: center;
  width: 20px;
  overflow: hidden;
  max-width: 100%;
`;

const SortContainer = styled(Box)`
  align-items: center;
  align-self: center;
  display: flex;
  gap: 8px;
  margin: auto 0;
`;

const SortText = styled(Box)`
  color: var(--gray-scale-gray-500, #808080);
  margin: auto 0;
  font: 400 14px/21px Poppins, sans-serif;
`;

const SortOption = styled(Box)`
  border-radius: 4px;
  border: 1px solid var(--gray-scale-gray-100, #e6e6e6);
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  gap: 0px;
  padding: 10px 16px;
`;

const SortOptionText = styled(Box)`
  color: var(--gray-scale-gray-700, #4d4d4d);
  font: 400 14px/21px Poppins, sans-serif;
`;

const ResultText = styled(Box)`
  color: var(--gray-scale-gray-600, #666);
  align-self: center;
  white-space: nowrap;
  margin: auto 0;
  font: 400 16px/24px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;
