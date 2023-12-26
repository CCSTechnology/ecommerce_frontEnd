import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Paper, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import { useDispatch, useSelector } from 'react-redux';
import { MyOrdersApi } from '../../../redux/api/public/authService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { ImagePath } from '../../../utils/helpers';

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
  return (
    <StyledContainer>
      <MyOrdersWrapper>
        <Title variant='h4'>My Orders</Title>
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "auto",
          maxWidth: "70%"
        }}>
          {
            orderList?.map((order, index) => {
              return <Accordion key={index} elevation={4} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center "
                  }}>
                    <OrderId>{order?.order_no}</OrderId>
                    <span>{dayjs(order?.date).format("DD MMM YYYY")}</span>
                    <span>{order.details?.length} Products</span>
                  </Box>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  {
                    order?.details?.map((detail, detailIndex) => {
                      return <Grid container justifyContent={'space-between'} key={detailIndex} >
                      <Grid item md={1} lg={3} sx={{
                          padding: "10px",
                          display: 'flex',
                          alignItems: "center"
                        }}>
                          <Image loading="lazy" srcSet={ImagePath + detail.product.file_name} />
                        </Grid>
                        <Grid item md={3} lg={3} sx={{
                          padding: "10px",
                          display: 'flex',
                          alignItems: "center"
                        }}>
                          {detail.product_name}
                        </Grid>
                        <Grid item md={3} lg={3} textAlign={'center'} sx={{
                          display : "flex",
                          justifyContent : "center",
                          alignItems : "center"
                        }}>
                          X{detail.quantity}
                        </Grid>
                        <Grid item md={3} lg={3} textAlign={'center'} sx={{
                          display : "flex",
                          justifyContent : "center",
                          alignItems : "center"
                        }}>
                          ₹ {detail.total_amount}
                        </Grid>
                      </Grid>
                    })
                  }
                  <Divider />
                  <Grid container >
                    <Grid item md={3} lg={3} sx={{
                      padding: "10px",
                      display: 'flex',
                      alignItems: "center"
                    }}>Tax:</Grid>
                    <Grid item md={3} lg={3}></Grid>
                    <Grid item md={3} lg={3}></Grid>

                    <Grid item md={3} lg={3} textAlign={'center'} sx={{
                      display : "flex",
                      justifyContent :"center",
                      alignItems :"center"
                    }}>₹{order?.total_tax}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={3} lg={3} sx={{
                      padding: "10px",
                      display: 'flex',
                      alignItems: "center"
                    }}>Total:</Grid>
                    <Grid item md={3} lg={3}></Grid>
                    <Grid item md={3} lg={3}></Grid>

                    <Grid item md={3} lg={3} textAlign={'center'} sx={{
                          display : "flex",
                          justifyContent : "center",
                          alignItems : "center"
                        }}>₹{order?.grand_total}</Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
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
  margin-bottom: 30px;
`

const OrderId = styled(Typography)`
   text-align: center;
  font-weight: 500;
`

const Image = styled('img')`
    height: 60px;
    width: 60px;
    object-fit: contain;
`