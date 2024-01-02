import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import successImage from "../../../assets/images/payment-success.png";
import { Box, Container, Grid, Typography } from "@mui/material";
import Location from "../../../assets/icons/location1.png";
import Call from "../../../assets/icons/phone.png";
import Email from "../../../assets/icons/email.png";
import GoogleMap from "../../../components/GoogleMap";
import Facebook from "../../../assets/icons/facebookicon.png";
import Twitter from "../../../assets/icons/twicons.png";
import LinkedIn from "../../../assets/icons/linkedlnicon.png";
import Insta from "../../../assets/icons/instagramicons.png";
import { Link } from "react-router-dom";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
const ContactUs = ({ title }) => {
  return (
    <>
      <StyledContainer>
        <Box sx={{}}>
          <Grid container>
            <Grid
              item
              xs={12}
              className="contact-banner"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{ fontSize: "40px", fontWeight: 600, color: " white" }}
              >
                Contact Us
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 10 }}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box textAlign={"center"} className="Contactline">
                <img src={Location} style={{ height: "70px" }} />
                <Box>
                  <Typography sx={{ mt: 2, fontSize: "15px" }}>
                    TrueVine Foods Pvt Limited
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    plot no 17,Balan Avenue, KTC Nagar,
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    Tirunelveli , TamilNadu-627011 India
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: { xs: 2, md: 0 } }}>
              <Box textAlign={"center"} className="Contactline">
                <Link to="tel:+919321188645">
                  <img src={Call} style={{ height: "70px" }} />
                </Link>

                <Link to="tel:+919321188645">
                  <Typography sx={{ mt: 2, fontSize: "15px" }}>
                    +91 93211 88645
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign={"center"}>
                <Link to="mailto:info@truevinefoods.com">
                  <img src={Email} style={{ height: "70px" }} />
                </Link>
                <Link to="mailto:info@truevinefoods.com">
                  <Typography sx={{ mt: 2, fontSize: "15px" }}>
                    customercare@truevine.in
                  </Typography>
                </Link>

                <Box
                  sx={{ mt: 2 }}
                  display={"flex"}
                  justifyContent={"center"}
                  gap={2}
                >
                  <Link to="www.facebook.com">
                    <img src={Facebook} />
                  </Link>
                  <Link to="www.twitter.com">
                    <img src={Twitter} />
                  </Link>
                  <Link to="www.linkedin.com">
                    <img src={LinkedIn} />
                  </Link>
                  <Link to="www.instagram.com">
                    <img src={Insta} />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledContainer>
      <StyledContainer>
        <Box sx={{ mt: 8 }}>
          <GoogleMap />
        </Box>
      </StyledContainer>
    </>
  );
};
export default ContactUs;
