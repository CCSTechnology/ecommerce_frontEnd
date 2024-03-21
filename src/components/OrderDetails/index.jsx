import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MyOrders from "../../views/ecommerce/myorders";
import { Divider, Grid, Skeleton, Stack } from "@mui/material";
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

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              {orderSingleViewData?.loading ? (
                <Skeleton width={200} />
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Order No :{orderSingleViewData?.data?.data?.order_no}
                </Typography>
              )}
            </Box>
            <Box>
              {orderSingleViewData?.loading ? (
                <Skeleton width={200} />
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Date :{" "}
                  {dayjs(orderSingleViewData?.data?.data?.date).format(
                    "DD MMM YYYY"
                  )}
                </Typography>
              )}
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
                    {" "}
                    {orderSingleViewData?.loading ? (
                      <Skeleton variant="circular" width={50} height={50} />
                    ) : (
                      <Image
                        loading="lazy"
                        srcSet={ImagePath + detail?.product?.file_name}
                      />
                    )}
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
                    {orderSingleViewData?.loading ? (
                      <Skeleton variant="rounded" width={200} />
                    ) : (
                      <Typography sx={{ fontSize: "14px" }}>
                        {" "}
                        {detail.product_name}
                      </Typography>
                    )}

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
                    {orderSingleViewData?.loading ? (
                      <Skeleton variant="rounded" width={200} />
                    ) : (
                      <Typography sx={{ fontSize: "14px" }}>
                        {detail.quantity}
                      </Typography>
                    )}
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
                    {orderSingleViewData?.loading ? (
                      <Skeleton variant="rounded" width={200} />
                    ) : (
                      <Typography sx={{ fontSize: "14px" }}>
                        ₹{detail.total_amount}
                      </Typography>
                    )}
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
              <Typography sx={{ fontSize: "14px" }}> Shipping Cost:</Typography>
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
              {" "}
              {orderSingleViewData?.loading ? (
                <Skeleton variant="rounded" width={200} />
              ) : (
                <Typography sx={{ fontSize: "14px" }}>
                  ₹{orderSingleViewData?.data?.data?.shipping_cost}
                </Typography>
              )}
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
              <Typography sx={{ fontSize: "14px" }}>Total:</Typography>
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
              {" "}
              {orderSingleViewData?.loading ? (
                <Skeleton width={200} />
              ) : (
                <Typography sx={{ fontSize: "14px" }}>
                  ₹{orderSingleViewData?.data?.data?.grand_total}
                </Typography>
              )}
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
