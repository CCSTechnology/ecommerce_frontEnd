import { Box, Button, Typography, styled } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps'
import CartProductCard from './CartProductCard'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import Stripe from 'stripe'
import { useDispatch, useSelector } from 'react-redux'
import { cartViewServices } from '../../../redux/api/public/cartServices'
import { useNavigate } from 'react-router-dom'

const stripe = Stripe('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const YOUR_DOMAIN = "http://localhost:5173"
const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: cartData } = useSelector((state) => state.cart.cartViewServices)
  const [cartList, setCartList] = useState([])
  // const cartList = cartData?.details || []
  const cart_id = localStorage.getItem("cart_id") || null
  const listCartApi = useCallback(async() => {
    try {
      const response = await dispatch(cartViewServices({
        cart_id
      })).unwrap()
      setCartList(response?.details)
    } catch (error) {
      console.log(error, "error")
    }
  }, [])


  const handlePayment = async () => {
    navigate('/checkout')
    // try {
    //   const session = await stripe.checkout.sessions.create({
    //     billing_address_collection: 'auto',
    //     payment_method_types: ['card',],
    //     'line_items': [{
    //       'price_data': {
    //         'currency': 'inr',
    //         'unit_amount': 2000,
    //         'product_data': {
    //           'name': 'Stubborn Attachments',
    //           'images': ["https://i.imgur.com/EHyR2nP.png"],
    //         },
    //       },
    //       'quantity': 1,
    //     }],
    //     mode: 'payment',

    //     success_url: `${YOUR_DOMAIN}/`,
    //     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    //   });
    //   window.location.href = session.url
    // } catch (error) {
    //   console.log(error, "err")
    // }

  }


  useEffect(() => {
    listCartApi()
  }, [cart_id])
  return (
    <Wrapper>
      <CustomBreadcrumbs />
      <CardTitle>My Cart</CardTitle>
      <ProductList>
        {cartList.map((product, index) => {
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