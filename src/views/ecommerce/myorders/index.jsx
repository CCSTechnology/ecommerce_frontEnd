import { Box, Grid, Paper, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import Collapse from '@mui/material/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { MyOrdersApi } from '../../../redux/api/public/authService';


export default function MyOrders() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.publicAuth.MyOrdersApi.data)
  const [orderList, setOrderList] = useState(orders || null)
  async function myOrdersList(params) {
    try {
      const response = await dispatch(MyOrdersApi(params)).unwrap()
      setOrderList(response)
    } catch (error) {
      console.log(error, "myOrdersList")
    }
  }

  useEffect(() => {
    myOrdersList({})
  }, [])
  useEffect(() => {
    if (orders !== undefined) {
      setOrderList(orders)
    }
  }, [orders])
  console.log(orderList, "orderList")
  return (
    <StyledContainer>
      <MyOrdersWrapper>
        <Title variant='h4'>My Orders</Title>
        <Box sx={{
          width : "100%"
        }}>
          {
            orderList?.map((order, index) => {
              return index === 0 && <Paper key={index}>
                <OrderId>{order?.order_no}</OrderId>
                <Box>
                  {
                    order?.details?.map((detail, detailIndex) => {
                      return <Grid container >
                        <Grid item md={4} lg={4} sx={{
                          padding : "10px",
                          display : 'flex',
                          alignItems :"center"
                        }}>
                          Product Name : {detail.product_name}
                        </Grid>
                        <Grid item md={4} lg={4}>
                          Quantity : {detail.quantity}
                        </Grid>
                        <Grid item md={4} lg={4}>
                          Amount : {detail.total_amount}
                        </Grid>
                      </Grid>
                    })
                  }
                </Box>
              </Paper>
            })
          }

        </Box>
      </MyOrdersWrapper>
    </StyledContainer>
  )
}


const MyOrdersWrapper = styled(Box)`
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`


const Title = styled(Typography)`
  text-align: center;
  font-weight: 500;
  margin-bottom: 16px;
`

const OrderId = styled(Typography)`
   text-align: center;
  font-weight: 500;
  margin-bottom: 16px;
`