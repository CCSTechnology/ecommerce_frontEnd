import * as React from "react";
import styled from "styled-components";
import StyledContainer from "../../components/ecommerce/StyledContainer";
import { facebook, insta, linkedin, logo1 } from "../../helpers/images";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

export default function PublicFooterNew(props) {
  return (
    <StyledContainer>
      <Box sx={{ color: "black" }}>
        <Grid container>
          <Grid item md={5} mt={5} px={10}>
            <LogoContainer to="/">
              <Logo loading="lazy" src={logo1} />
            </LogoContainer>
            <Typography className="footer-new">
              Truvine FOODS PVT LIMITED
            </Typography>
            <Typography className="footer-new1">
              Lorem ipsum dolor sit amet consectetur. Sit cursus arcu ante
              aliquam iaculis morbi ultricies bibendum in. Risus non suspendisse
              libero purus potenti. Dui sit arcu penatibus duis a non massa
              ultricies.D
            </Typography>
          </Grid>
          <Grid item md={7} mt={5} px={10}>
            <Stack direction={"row"} gap={5}>
              <Grid item md={3}>
                <Stack direction={"column"} gap={2}>
                  <p className="footer-new-link1">Categories</p>
                  <p className="footer-new-link2">Categories</p>
                  <p className="footer-new-link2">Categories</p>
                  <p className="footer-new-link2">Categories</p>
                  <p className="footer-new-link2">Categories</p>
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Stack direction={"column"} gap={2}>
                  <p className="footer-new-link1">Quick Links</p>
                  <p className="footer-new-link2">Quick Links</p>
                  <p className="footer-new-link2">Quick Links</p>
                  <p className="footer-new-link2">Quick Links</p>
                  <p className="footer-new-link2">Quick Links</p>
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Stack direction={"column"} gap={2}>
                  <p className="footer-new-link1">Helps</p>
                  <p className="footer-new-link2">Helps</p>
                  <p className="footer-new-link2">Helps</p>
                  <p className="footer-new-link2">Helps</p>
                  <p className="footer-new-link2">Helps</p>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            container
            sx={{
              background: "#951E76",
              marginTop: "30px",
              padding: "10px",
              marginBottom: "30px",
              px: 10,
            }}
          >
            <Grid item md={6}>
              <p className="new-footer-link3">
                Truvine Foods Pvt Limited @ 2024. All Rights Reserved
              </p>
            </Grid>
            <Grid
              item
              md={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
              gap={3}
            >
              {" "}
              <LogoContainer to="/">
                <img src={facebook} />
              </LogoContainer>
              <LogoContainer to="/">
                <img src={insta} />
              </LogoContainer>
              <LogoContainer to="/">
                <img src={linkedin} />
              </LogoContainer>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>
  );
}

const LogoContainer = styled(Link)`
  align-items: center;
  align-self: center;
  display: flex;
  gap: 8px;
  margin: auto 0;
`;
const Logo = styled("img")`
  object-fit: contain;
  object-position: center;
  width: 118px;
  overflow: hidden;
  max-width: 100%;
  margin: auto 0;
  padding: 4px;
`;
