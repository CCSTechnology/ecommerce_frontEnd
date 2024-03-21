import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Skeleton } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OrderShippingCard(props) {
  const { orderSingleViewData } = props;

  return (
    <Card sx={{ minWidth: 275, mb: 4 }}>
      <CardContent>
        <Grid container>
          <Grid item md={6}>
            {orderSingleViewData?.loading ? (
              <>
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
              </>
            ) : (
              <>
                <Typography className="f14" sx={{ fontWeight: "700" }}>
                  Customer Address:
                </Typography>
                <Typography className="f14">
                  {orderSingleViewData?.data?.data?.shipping_address?.line1}
                </Typography>
                <Typography className="f14">
                  {" "}
                  {
                    orderSingleViewData?.data?.data?.shipping_address
                      ?.street_name
                  }
                </Typography>
                <Typography className="f14">
                  {" "}
                  {orderSingleViewData?.data?.data?.shipping_address?.city}
                </Typography>
                <Typography className="f14">
                  {" "}
                  {orderSingleViewData?.data?.data?.shipping_address?.state}
                </Typography>
                <Typography className="f14">
                  {" "}
                  {orderSingleViewData?.data?.data?.shipping_address?.country}
                </Typography>
                <Typography className="f14">
                  {" "}
                  {orderSingleViewData?.data?.data?.shipping_address?.zipcode}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item md={6}>
            <Grid container sx={{ width: "900px" }}>
              <Grid
                item
                md={1}
                lg={3}
                sx={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography className="f14">Courier Name:</Typography>
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
                  <Skeleton width={200} />
                ) : (
                  <Typography className="f14">
                    {" "}
                    {orderSingleViewData?.data?.data?.courier_name}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container sx={{ width: "900px" }}>
              <Grid
                item
                md={1}
                lg={3}
                sx={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                {orderSingleViewData?.loading ? (
                  <Skeleton width={200} />
                ) : (
                  <Typography className="f14">Total Weight:</Typography>
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
                  <Skeleton width={200} />
                ) : (
                  <Typography className="f14">
                    {orderSingleViewData?.data?.data?.total_weight}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
