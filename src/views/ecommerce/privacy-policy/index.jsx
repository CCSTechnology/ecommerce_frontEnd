import React from "react";
import { Box, Container, Grid } from "@mui/material";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const PrivacyPolicy = () => {
  return (
    <StyledContainer>
      <Container>
        <Box sx={{ mt: 3 }}>
          <Box>
            <Typography
              sx={{ fontSize: "30px", fontWeight: 600, color: "#951e76" }}
            >
              Privacy Policy
            </Typography>
          </Box>
          <Box sx={{ mt: 3, mb: 6 }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  What information do we collect?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  We collect information from you when you register on our
                  website, place an order or subscribe to our newsletter. When
                  ordering or registering on our website, as appropriate, you
                  may be asked to enter your: name, e-mail address, mailing
                  address, phone number or credit card information. You may,
                  however, visit our site anonymously.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  What do we use your information for?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Any of the information we collect from you may be used in one
                  of the following ways:
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  To process transactions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Your information, whether public or private, will not be sold,
                  exchanged, transferred, or given to any other company for any
                  reason whatsoever, without your consent, other than for the
                  express purpose of delivering the purchased product or service
                  requested.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  To send periodic emails
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  The email address you provide for order processing, will be
                  used to send you information and updates pertaining to your
                  order. This email address also may be used for the purpose of
                  promoting sales or marketing specifically regarding this
                  website and we will never share or loan your information to
                  any
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </StyledContainer>
  );
};

export default PrivacyPolicy;
