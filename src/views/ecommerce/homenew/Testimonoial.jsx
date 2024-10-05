import {
  Box,
  Container,
  styled,
  Stack,
  Grid,
  Card,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  best_seller1,
  best_seller2,
  best_seller3,
  best_seller4,
  product_1,
  product_2,
  product_3,
  testi,
  testi1,
} from "../../../helpers/images";

const Testimonial = () => {
  return (
    <Box sx={{ background: "white" }} pb={5}>
      <Grid container pt={5}>
        <Grid md={12}>
          <Stack direction={"column"}>
            <p className="our-products-new">TESTIMONIAL</p>
            <p className="our-products-new1">CUSTOMER SAYS</p>
          </Stack>
        </Grid>
      </Grid>
      <Container maxWidth={"lg"}>
        <Grid container pt={4}>
          <Grid item md={6} pr={2}>
            <Card>
              <Stack direction={"row"} gap={5} p={5}>
                <Box>
                  <img src={testi1} className="testimonial-new"></img>
                </Box>
                <Stack direction={"column"}>
                  <p className="testimonial-new1">
                    Lorem ipsum dolor sit amet consectetur. Sit bibendum a
                    lacinia ac. Ac dui amet vel orci vitae sed ornare orci
                    tempus. Libero sed neque adipiscing nec eget. Sit id dolor
                    amet ullamcorper purus. Proin id eu sed facilisi pretium
                    duis. Eu vel tortor sed at nullam.
                  </p>
                  <p className="testimonial-new2">Arun Kumar</p>
                  <p className="testimonial-new3">20 March 2024</p>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item md={6} pl={2}>
            <Card>
              <Stack direction={"row"} gap={5} p={5}>
                <Box>
                  <img src={testi1} className="testimonial-new"></img>
                </Box>
                <Stack direction={"column"}>
                  <p className="testimonial-new1">
                    Lorem ipsum dolor sit amet consectetur. Sit bibendum a
                    lacinia ac. Ac dui amet vel orci vitae sed ornare orci
                    tempus. Libero sed neque adipiscing nec eget. Sit id dolor
                    amet ullamcorper purus. Proin id eu sed facilisi pretium
                    duis. Eu vel tortor sed at nullam.
                  </p>
                  <p className="testimonial-new2">Arun Kumar</p>
                  <p className="testimonial-new3">20 March 2024</p>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonial;
