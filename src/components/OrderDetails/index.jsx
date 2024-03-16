import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MyOrders from "../../views/ecommerce/myorders";
import { Divider, Grid, Stack } from "@mui/material";
import styled from "styled-components";
import dayjs from "dayjs";
import { ImagePath } from "../../utils/helpers";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OrderDetailsCard(props) {
  const { orderSingleViewData } = props;
  console.log(orderSingleViewData);
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography sx={{ textAlign: "center", fontWeight: 500 }}>
                Order No :{orderSingleViewData?.data?.data?.order_no}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ textAlign: "center", fontWeight: 500 }}>
                Date :{" "}
                {dayjs(orderSingleViewData?.data?.data?.date).format(
                  "DD MMM YYYY"
                )}
              </Typography>
            </Box>
          </Stack>

          {orderSingleViewData?.data?.data?.details?.map(
            (detail, detailIndex) => {
              return (
                <Grid
                  container
                  justifyContent={"space-between"}
                  key={detailIndex}
                >
                  <Grid
                    item
                    md={1}
                    lg={3}
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Image
                      loading="lazy"
                      srcSet={ImagePath + detail?.product?.file_name}
                    />
                  </Grid>
                  <Grid
                    item
                    md={3}
                    lg={3}
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography> {detail.product_name}</Typography>

                    {/* Product Name */}
                  </Grid>
                  <Grid
                    item
                    md={3}
                    lg={3}
                    textAlign={"center"}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{detail.quantity}</Typography>
                    {/* Quantity */}
                  </Grid>
                  <Grid
                    item
                    md={3}
                    lg={3}
                    textAlign={"center"}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>₹{detail.total_amount}</Typography>{" "}
                    {/* Amount */}
                  </Grid>
                </Grid>
              );
            }
          )}

          <Grid container>
            <Grid
              item
              md={3}
              lg={3}
              sx={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography> Shipping Cost:</Typography>
            </Grid>
            <Grid item md={3} lg={3}></Grid>
            <Grid item md={3} lg={3}></Grid>

            <Grid
              item
              md={3}
              lg={3}
              textAlign={"center"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                ₹{orderSingleViewData?.data?.data?.shipping_cost}
              </Typography>

              {/* tax */}
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              md={3}
              lg={3}
              sx={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Total:</Typography>
            </Grid>
            <Grid item md={3} lg={3}></Grid>
            <Grid item md={3} lg={3}></Grid>

            <Grid
              item
              md={3}
              lg={3}
              textAlign={"center"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                ₹{orderSingleViewData?.data?.data?.grand_total}
              </Typography>

              {/* total */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

const Image = styled("img")`
  height: 60px;
  width: 60px;
  object-fit: contain;
`;
