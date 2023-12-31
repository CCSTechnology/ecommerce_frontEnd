import React from "react";
import { Box, Container, Grid } from "@mui/material";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const ShippingPolicy = () => {
  return (
    <StyledContainer>
      <Container>
        <Box sx={{ mt: 3 }}>
          <Box>
            <Typography
              sx={{ fontSize: "30px", fontWeight: 600, color: "#951e76" }}
            >
              Shipping Policy
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
                  Shipping Policy
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Truevine aspires to deliver products to all regions within the
                  territory of India in a good condition through logistics
                  service providers.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  Estimated delivery time
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  for local orders is 2-3 working days, 3-7 working days for
                  outstation orders and 5-9 working days for orders delivered to
                  JK, North East India . We ship on all days from Monday to
                  Saturday except Sundays and Public Holidays.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  Tracking
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Once your order has been dispatched, you may receive an email
                  with the details of the tracking number and the courier
                  company that is processing Your order. You can typically track
                  the status of your package 24 hours after Your order is
                  dispatched by the seller/product manufacturer unless the same
                  is not updated on account of issues beyond our reasonable
                  control (for instance, technical issues with logistics
                  company, disruptions due to weather conditions, force majeure
                  events including, strike, lockouts, server disruption, etc.)
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  Shipping charges
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Shipping charges would vary from time to time and will be made
                  visible to the customer on the Site and/or Application before
                  an order is placed by the End User. You can reach out to us at
                  customercare@truevine.in for any shipping related queries.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </StyledContainer>
  );
};

export default ShippingPolicy;
