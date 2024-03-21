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

export default function BasicCard(props) {
  const { orderSingleViewData } = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container>
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
            <Typography sx={{ fontSize: "14px" }}>Customer Name:</Typography>
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
            {/* {detail.product_name} */}
            {orderSingleViewData?.loading ? (
              <Skeleton width={200} />
            ) : (
              <Typography sx={{ fontSize: "14px" }}>
                {orderSingleViewData?.data?.data?.guest
                  ? orderSingleViewData?.data?.data?.guest?.name
                  : orderSingleViewData?.data?.data?.customer?.first_name}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container>
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
            <Typography sx={{ fontSize: "14px" }}>Phone Number:</Typography>
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
            {/* {detail.product_name} */}
            {orderSingleViewData?.loading ? (
              <Skeleton width={200} />
            ) : (
              <Typography sx={{ fontSize: "14px" }}>
                {orderSingleViewData?.data?.data?.guest
                  ? orderSingleViewData?.data?.data?.guest?.phone_number
                  : orderSingleViewData?.data?.data?.customer?.mobile}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container>
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
            <Typography sx={{ fontSize: "14px" }}>Email:</Typography>
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
            {/* {detail.product_name} */}
            {orderSingleViewData?.loading ? (
              <Skeleton width={200} />
            ) : (
              <Typography sx={{ fontSize: "14px" }}>
                {orderSingleViewData?.data?.data?.guest
                  ? orderSingleViewData?.data?.data?.guest?.email
                  : orderSingleViewData?.data?.data?.customer?.email}
                :
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
