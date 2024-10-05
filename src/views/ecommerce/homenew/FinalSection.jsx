import { Box, Container, styled, Stack, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { product_1, product_2, product_3 } from "../../../helpers/images";

const FinalSection = () => {
  return (
    <Box sx={{ background: "#F9F9F9", height: "104px" }}>
      <Container maxWidth={"lg"}>
        <Grid container>
          <Grid item md={3} mt={3} className="grid-final">
            <Stack direction={"row"} gap={3}>
              {/* <p className="home-finalsec-div"> </p> */}
              <FeatureImage
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ad327fe-5528-4d9c-a10c-985ac61a8243?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <p className="final-sec">FREE SHIPPING</p>
            </Stack>
          </Grid>
          <Grid item md={3} mt={3} className="grid-final">
            <Stack direction={"row"} gap={3}>
              <FeatureImage
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/edce3f55-b1b2-48b2-938b-b679bcc45494?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <p className="final-sec">24 hours Service</p>
            </Stack>
          </Grid>
          <Grid item md={3} mt={3} className="grid-final">
            <Stack direction={"row"} gap={3}>
              <FeatureImage
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed01af55-08ff-4f52-8f24-667b2a23b2b0?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <p className="final-sec">Cash on Delivery</p>
            </Stack>
          </Grid>
          <Grid item md={3} mt={3} className="grid-final">
            <Stack direction={"row"} gap={3}>
              <FeatureImage
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d9b2960-4763-4908-9eb3-3e892b8934a8?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <p className="final-sec">100% Safe & Secure</p>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FinalSection;
const FeatureImage = styled("img")`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 40px;
  overflow: hidden;
  max-width: 100%;
  margin: auto 0;
`;
