import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

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
  console.log(orderSingleViewData);
  return (
    <Card sx={{ minWidth: 275, mb: 4 }}>
      <CardContent>
        <Grid container>
          <Grid item md={6}>
            <Typography>Customer Address:</Typography>
            <Typography>
              {orderSingleViewData?.data?.data?.shipping_address?.line1}
            </Typography>
            <Typography>
              {" "}
              {orderSingleViewData?.data?.data?.shipping_address?.street_name}
            </Typography>
            <Typography>
              {" "}
              {orderSingleViewData?.data?.data?.shipping_address?.city}
            </Typography>
            <Typography>
              {" "}
              {orderSingleViewData?.data?.data?.shipping_address?.state}
            </Typography>
            <Typography>
              {" "}
              {orderSingleViewData?.data?.data?.shipping_address?.country}
            </Typography>
            <Typography>
              {" "}
              {orderSingleViewData?.data?.data?.shipping_address?.zipcode}
            </Typography>
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
                <Typography>Courier Name:</Typography>
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
                <Typography>
                  {" "}
                  {orderSingleViewData?.data?.data?.courier_name}
                </Typography>
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
                <Typography>Total Weight:</Typography>
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
                <Typography>
                  {" "}
                  {orderSingleViewData?.data?.data?.total_weight}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
