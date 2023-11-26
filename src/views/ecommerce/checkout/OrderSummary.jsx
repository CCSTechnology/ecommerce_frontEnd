import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrderSummary({ checkout , guest, handleCheckOutGuest , handleCheckOut, handleSubmit}) {
    const navigate = useNavigate()
    return (
        <OrderSummaryWrapper>
            <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
            <Box sx={{
                
            }}>
                <OrderAmountWrapper>
                    <Typography>Subtotal:</Typography>
                    <span>₹ {Number(checkout?.total_amount || 0).toFixed(2)}</span>
                </OrderAmountWrapper>
                <OrderAmountWrapper>
                    <Typography>Shipping:</Typography>
                    <span>Free</span>
                </OrderAmountWrapper>
                <OrderAmountWrapper>
                    <Typography>Total:</Typography>
                    <span>₹ {Number(checkout?.grand_total || 0).toFixed(2)}</span>
                </OrderAmountWrapper>
            </Box>
            <ButtonWrapper>
            {
                        guest === true ? <form onSubmit={handleSubmit(handleCheckOutGuest)}>

                            <Button type='submit' variant='contained' >
                                Guest Check out
                            </Button>
                        </form> : <form onSubmit={handleSubmit(handleCheckOut)}>

                            <Button type='submit' variant='contained' >
                                Check out
                            </Button>
                        </form>
                    }
                <Button variant='contained' onClick={()=>{
                    navigate("/")
                }}>
                    Continue Shopping
                </Button>
            </ButtonWrapper>

            
        </OrderSummaryWrapper>
    )
}


const OrderSummaryWrapper = styled('section')(() => ({
    width: "100%",
    height: "100%",
    padding: "12px 20px",
}))


const OrderSummaryTitle = styled(Box)(() => ({
    color: "var(--gray - scale - gray - 900, #1A1A1A)",

    /* Body XL/Body XL, 500 */
    fontFamily: "Poppins",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "150%", /* 30px */
}))


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
    color: var(--gray-scale-gray-700, #4D4D4D);

    /* Body Small/Body Small, 400 */
    font-family: Poppins;   
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
}

span {
    color: var(--gray-scale-gray-900, #1A1A1A);

/* Body Small/Body Small, 500 */
    font-family: Poppins;
    font-size: 14px;    
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
}
`


const ButtonWrapper = styled(Box)`
    display: flex;
    gap: 10px;
`