import { Button } from '@mui/material';
import React from 'react'
import stripe from 'stripe'
const stripeS = stripe('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const YOUR_DOMAIN = "http://localhost:5173"

const CheckOut = () => {
  const handlePayment = async () => {

    const prices = await stripeS.prices.list({
      limit: 3,
    });
    const session = await stripeS.checkout.sessions.create({
      billing_address_collection: 'auto',
      payment_method_types: ['card'],
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
    window.location.replace(session.url)
    console.log(session.url, 'session')
  }
  return (
    <Button onClick={handlePayment}>
      Buy Now
    </Button>
  )
}

export default CheckOut