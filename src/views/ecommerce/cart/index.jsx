import { Box, Button, Typography, styled } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps'
import CartProductCard from './CartProductCard'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import { useDispatch, useSelector } from 'react-redux'
import { cartViewServices } from '../../../redux/api/public/cartServices'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: cartData } = useSelector((state) => state.cart.cartViewServices)
  const [cartList, setCartList] = useState(cartData?.details || [])
  // const cartList = cartData?.details || []
  const cart_id = localStorage.getItem("cart_id") || null
  const listCartApi = useCallback(async () => {
    try {
      const response = await dispatch(cartViewServices({
        cart_id
      })).unwrap()
      setCartList(response?.details)
    } catch (error) {
    }
  }, [])


  const handlePayment = async () => {
    navigate('/checkout')
  }


  useEffect(() => {
    listCartApi()
  }, [cart_id])
  return (
    <Wrapper>
      <CustomBreadcrumbs />
      <CardTitle>My Cart</CardTitle>
      <ProductList>
        {cartList?.map((product, index) => {
          return <CartProductCard key={index} product={product} finishApi={listCartApi} />
        })}
      </ProductList>
      <ButtonWrapper>
        <Button variant='contained' onClick={handlePayment}>Check out</Button>
        <Button variant='contained'>Continue Shop</Button>
      </ButtonWrapper>
      {

      }
    </Wrapper>
  )
}

export default Cart


const Wrapper = styled(StyledContainer)`

`

const ProductList = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 15px;
`

const CardTitle = styled(Typography)`
    color: var(--gray-scale-gray-900, #1A1A1A);
text-align: center;

/* Heading 05/Heading 05 — 600 */
font-family: Poppins;
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 120%; /* 38.4px */
`

const ButtonWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-block: 20px;
`