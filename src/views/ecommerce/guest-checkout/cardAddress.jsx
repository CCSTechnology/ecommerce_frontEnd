import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  const navigate = useNavigate();
  const { addrData, handleOpen } = props;
  console.log(addrData);

  return (
    <>
      {addrData?.address_details?.map((item, i) => (
        <Card sx={{ minHeight: 180, mt: 3 }}>
          <CardContent>
            <Grid container>
              <Grid item>
                <LocationOnIcon />
              </Grid>
              <Grid item sx={{ pl: 3 }}>
                <Typography component="div">{item?.street_name}</Typography>
                <Typography component="div">{item?.line1}</Typography>
                <Typography component="div">{item?.city}</Typography>
                <Typography component="div">{item?.state}</Typography>
                <Typography component="div">{item?.country}</Typography>
                <Typography component="div">{item?.zipcode}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button
        size="small"
        sx={{
          mt: 3,
          background: "#951e76",
          color: "white",
          //   justifyContent: "center",
          //   display: "flex",
          //   alignItems: "center",
          textAlign: "center",
        }}
        onClick={handleOpen}
      >
        Edit Address
      </Button>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
    </>
  );
}
