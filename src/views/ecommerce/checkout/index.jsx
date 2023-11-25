import { Box, Button, Dialog, Modal, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import Stripe from 'stripe'
import { useDispatch, useSelector } from 'react-redux'
import { cartViewServices, checkOutWithUser } from '../../../redux/api/public/cartServices'
import CartProductCard from '../cart/CartProductCard'
import { publicGetMe } from '../../../redux/api/public/authService'
import { useNavigate } from 'react-router-dom'

const stripe = Stripe('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const YOUR_DOMAIN = "http://localhost:5173"
const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [popUp, setPopup] = useState(false)
  const { data: cartData } = useSelector((state) => state.cart.cartViewServices)
  const cartList = cartData?.details || []
  const carId = localStorage.getItem("cart_id") || null
  const listCartApi = (cart_id) => {
    dispatch(cartViewServices({
      cart_id
    }))
  }
  const handlePayment = async () => {
    try {
      // console.log(user, "user")
      const token = localStorage.getItem('public_token')
      if (token) {
        const user = await dispatch(publicGetMe()).unwrap()
        //Valid User
        if (user) {
          const response = await dispatch(checkOutWithUser({
            billing_address_id: 1,
            shipping_address_id: 1,
            delivery_charges: 0,
            cart_id: ""
          })).unwrap()
          console.log(response, "response")
          window.location.href = response.payment_details
        }
        //Expries Token
        else {
          navigate('/login=callBackUrl=/checkout')
        }
      }
      //Guest User
      else {
        setPopup(true)
      }

    } catch (error) {
      console.log(error, "error")
    }
  }


  useEffect(() => {
    listCartApi(carId)
  }, [carId])
  return (
    <Wrapper>
      <CustomBreadcrumbs />
      <CardTitle>Check Out</CardTitle>
      <ProductList>
        {cartList.map((product, index) => {
          return <CartProductCard key={index} product={product} quantityShow={false} />
        })}
      </ProductList>
      <ButtonWrapper>
        <Button variant='contained' onClick={handlePayment}>Check out</Button>
        <Button variant='contained'>Continue Shop</Button>
      </ButtonWrapper>
      {
        popUp ? <Dialog open={popUp}>
          <Button onClick={() => {
            const path = carId ? `/login?callBackUrl=/checkout&cart_id=${carId}` : "/login?callBackUrl=/checkout"
            navigate(path)
          }}>Login</Button>
          <Button onClick={() => {
            navigate("/guest-login")
          }}>Guest Login</Button>
        </Dialog> : null
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