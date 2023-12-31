import React from "react";
import { Box, Container, Grid } from "@mui/material";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TermsConditions = () => {
  return (
    <StyledContainer>
      <Container>
        <Box sx={{ mt: 3, mb: 4 }}>
          <Box>
            <Typography
              sx={{ fontSize: "30px", fontWeight: 600, color: "#951e76" }}
            >
              RETURN & CANCELLATIONS POLICY
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
                  Cancellation Policy
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Cancellation before shipment- If the order or the item(s) that
                  you want to cancel have not been shipped yet, you can write to
                  our customer support team on customercare@truevine.in or call
                  us on +91 9321188645 (Monday to Saturday, 10AM to 6PM. Our
                  team is offline on Sundays)
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  In such cases, the order will be cancelled, and the money will
                  be refunded to you within 5 business days after the
                  cancellation request is duly processed by us.
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
                  How will I get refunded for the cancelled orders and how long
                  will this process take?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  In case of cancellation before shipment, we process the refund
                  within 24-48 business hours after receiving the cancellation
                  request.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: "16px" }}>
                  In case of cancellation once the shipment has already been
                  dispatched or if it is being returned, we first check if the
                  refund is eligible, then we process the refund, once the
                  products have been received and verified at our warehouse.
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
                  What if I used discount vouchers during the time of payment
                  and I have to cancel my order?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Discount vouchers are intended for one-time use only and shall
                  be treated as used even if you cancel the order.
                </Typography>
              </AccordionDetails>
            </Accordion>
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
                  Returns, Replacements and Refunds
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Truevine offers its customers a refund/replacement on our
                  consumer goods only where one is eligible for a refund or a
                  replacement based on the below guidelines/rules set by our
                  Company. You must raise a return/exchange request of a product
                  within 24 hours of its delivery.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3, fontWeight: 600 }}>
                  Eligibility criteria:
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  product is spoiled due to natural nature of product (which can
                  happen in rare instances) or if product is damaged by
                  delivery.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Step 1: Contact our Customer Support team via email
                  (customercare@truevine.in) within 24 hours of receiving the
                  order.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Step 2: Provide us with your order ID details and your
                  request to replace/refund your order with the stated reason.
                  Kindly email an image of the product (proof of damage) and the
                  invoice for our reference. Our team will review the product
                  and will investigate the same on our end.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Step 3: We check eligibility of refund/exchange, and inform
                  you on the next steps. If we believe that a pickup of the
                  products is warranted, then we request you to arrange for a
                  return pick-up within 2-4 business days. We will initiate the
                  refund or replacement process only if the products pass our
                  eligibility criteria.
                </Typography>
                <Typography sx={{ mt: 3, fontWeight: 600 }}>
                  Kindly note:
                </Typography>
                <Typography>
                  Damages can be caused during transit but usually very unlikely
                  as the products, packaging and delivery partner have been
                  tested intensely in transit. If it is a case of replacement,
                  it is subject to the availability of stock. In case that a
                  replacement may not be available, we will refund you the full
                  amount.
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
                  Which are the items that cannot be returned/exchanged?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Returns will not be accepted under the following conditions: •
                  Product is damaged due to misuse • Returned without original
                  packaging including, price tags, labels, original packing,
                  freebies and other accessories or if original packaging is
                  damaged • Serial Number is tampered with. • Product seals are
                  broken, product has been used or if it has already been opened
                  • If request is initiated after more than 1 business days of
                  order delivery
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box
            sx={{ mt: 3, fontSize: "30px", fontWeight: 600, color: "#951e76" }}
          >
            {" "}
            REFUND POLICY
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
                  Will I get refunded for my spoiled/damaged order and how long
                  will this process take?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Our shipments go through rigorous quality check processes
                  before they leave our warehouse. However in the rare case that
                  your product is damaged during shipment or transit, you can
                  request for a replacement or cancellation and refund.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  These are consumable food products and a refund is only in
                  certain limited use cases. Very rarely, products do spoil
                  since these are natural products. We have a protocol in place
                  to help identify spoiled products, and we issue fast refunds
                  or exchanges for products that have been spoiled (no cause at
                  your end). Subscribers and returning customers are given
                  cashbacks, refunds and exchanges to quickly help fix product
                  related issues.
                </Typography>
                <Typography sx={{ mt: 3, fontWeight: 600 }}>
                  Kindly note:
                </Typography>
                <Typography>
                  proof of purchase, and proof of damage/issue must be reported
                  at individual product level. Eg if you purchase multiple
                  products and there is an issue with one item, refund will be
                  provided for that respective item and not for the whole
                  purchase.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  Our refund policy is strict since these are consumable
                  products.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Refunds are processed in a maximum of 15 days from the date
                  we receive returned goods.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • We accept only prepaid orders. In case of orders placed
                  through Net Banking, Debit Card or Credit Card, the refund
                  will be processed to the same account from which the payment
                  was made within 24-48 business hours of us receiving the
                  products back. It may take 5-7 business days for the amount to
                  reflect in your account.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  In case of a return/replacement/refund, we process the refund
                  once the products have been received and verified at our
                  warehouse. Our focus is complete customer satisfaction. Please
                  note that these are degradable, food-based consumable products
                  and once opened these products cannot be used by another
                  customer. They also have a limited shelf life limiting the
                  period under which they can be sold. In the event, if you are
                  displeased with the services provided, please send us an
                  email, providing us with genuine reasons in order for us to
                  start an investigation.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </StyledContainer>
  );
};

export default TermsConditions;
