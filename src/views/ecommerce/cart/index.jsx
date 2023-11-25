import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps'
import CartProductCard from './CartProductCard'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import Stripe from 'stripe'

const stripe = Stripe('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const YOUR_DOMAIN = "http://localhost:5173"
const Cart = () => {
    const handlePayment = async () => {
        try {
              const session = await stripe.checkout.sessions.create({
                billing_address_collection: 'auto',
                payment_method_types: ['card',],
                'line_items': [{
                  'price_data': {
                    'currency': 'inr',
                    'unit_amount': 2000,
                    'product_data': {
                      'name': 'Stubborn Attachments',
                      'images': ["https://i.imgur.com/EHyR2nP.png"],
                    },
                  },
                  'quantity': 1,
                }],
                mode: 'payment',
          
                success_url: `${YOUR_DOMAIN}/`,
                cancel_url: `${YOUR_DOMAIN}?canceled=true`,
              });
              window.location.href = session.url
        } catch (error) {
            console.log(error, "err") 
        }
        
      }
  return (
    <Wrapper>
        <CustomBreadcrumbs />
        <CardTitle>My Cart</CardTitle>
        <ProductList>
            {Array(2).fill(2).map((product, index)=>{
                return <CartProductCard key={index} />
            })}
        </ProductList>
        <ButtonWrapper>
                <Button variant='contained' onClick={handlePayment}>Check out</Button>
                <Button variant='contained'>Continue Shop</Button>
        </ButtonWrapper>
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