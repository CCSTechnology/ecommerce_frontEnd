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
        <Box sx={{ mt: 3 }}>
          <Box>
            <Typography
              sx={{ fontSize: "30px", fontWeight: 600, color: "#951e76" }}
            >
              Terms and Conditions
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
                  Basic Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  The terms "We" / "Us" / "Our"/”Company” individually and
                  collectively refer to TRUEVINE, and the terms "Visitor” ”User”
                  refer to the users. This page states the Terms and Conditions
                  under which you (Visitor) may visit this website
                  (www.truevine.in). Please read this page carefully. The
                  business, any of its business divisions and / or its
                  subsidiaries, associate companies or subsidiaries to
                  subsidiaries or such other investment companies (in India or
                  abroad) reserve their respective rights to revise these Terms
                  and Conditions at any time by updating this posting. You
                  should visit this page periodically to re-appraise yourself of
                  the Terms and Conditions, because they are binding on all
                  users of this Website.
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
                  USE OF CONTENT
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  All logos, brands, marks headings, labels, names, signatures,
                  numerals, shapes or any combinations thereof, appearing in
                  this site, except as otherwise noted, are properties either
                  owned, or used under license, by the business and / or its
                  associate entities who feature on this Website. The use of
                  these properties or any other content on this site, except as
                  provided in these terms and conditions or in the site content,
                  is strictly prohibited.
                </Typography>
                <Typography sx={{ mt: 2, fontSize: "16px" }}>
                  You may not sell or modify the content of this Website or
                  reproduce, display, publicly perform, distribute, or otherwise
                  use the materials in any way for any public or commercial
                  purpose without the respective organization’s or entity’s
                  written permission.
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
                  ACCEPTABLE WEBSITE USE
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  (A) Security Rules
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  Visitors are prohibited from violating or attempting to
                  violate the security of the Web site, including, without
                  limitation,
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Accessing data not intended for such user or logging into a
                  server or account which the user is not authorized to access,
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Attempting to probe, scan or test the vulnerability of a
                  system or network or to breach security or authentication
                  measures without proper authorization.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Attempting to interfere with service to any user, host or
                  network, including, without limitation, via means of
                  submitting a virus or "Trojan horse" to the Website,
                  overloading, "flooding", "mail bombing" or "crashing",
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  • Sending unsolicited electronic mail, including promotions
                  and/or advertising of products or services. Violations of
                  system or network security may result in civil or criminal
                  liability. The business and / or its associate entities will
                  have the right to investigate occurrences that they suspect as
                  involving such violations and will have the right to involve,
                  and cooperate with, law enforcement authorities in prosecuting
                  users who are involved in such violations.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  (B) General Rules
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  Visitors may not use the Web Site in order to transmit,
                  distribute, store or destroy material
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  (a) That could constitute or encourage conduct that would be
                  considered a criminal offence or violate any applicable law or
                  regulation,
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  (b) In a manner that will infringe the copyright, trademark,
                  trade secret or other intellectual property rights of others
                  or violate the privacy or publicity of other personal rights
                  of others
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  (c) That is libelous, defamatory, pornographic, profane,
                  obscene, threatening, abusive or hateful.
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
                  INDEMNITY
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  The User unilaterally agree to indemnify and hold harmless,
                  without objection, the Company, its officers, directors,
                  employees and agents from and against any claims, actions
                  and/or demands and/or liabilities and/or losses and/or damages
                  whatsoever arising from or resulting from their use of
                  www.truevine.in or their breach of the terms.
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
                  LIABILITY
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  User agrees that neither us nor our group companies,
                  directors, officers or employee shall be liable for any direct
                  or/and indirect or/and incidental or/and special or/and
                  consequential or/and exemplary damages, resulting from the use
                  or/and the inability to use the service or/and for cost of
                  procurement of substitute goods or/and services or resulting
                  from any goods or/and data or/and information or/and services
                  purchased or/and obtained or/and messages received or/and
                  transactions entered into through or/and from the service
                  or/and resulting from unauthorized access to or/and alteration
                  of user's transmissions or/and data or/and arising from any
                  other matter relating to the service, including but not
                  limited to, damages for loss of profits or/and use or/and data
                  or other intangible, even if we has been advised of the
                  possibility of such damages.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  User further agrees that we shall not be liable for any
                  damages arising from interruption, suspension or termination
                  of service, including but not limited to direct or/and
                  indirect or/and incidental or/and special consequential or/and
                  exemplary damages, whether such interruption or/and suspension
                  or/and termination was justified or not, negligent or
                  intentional, inadvertent or advertent.
                </Typography>
                <Typography sx={{ fontSize: "16px", mt: 3 }}>
                  User agrees that we shall not be responsible or liable to
                  user, or anyone, for the statements or conduct of any third
                  party of the service. In sum, in no event shall Company's
                  total liability to the User for all damages or/and losses
                  or/and causes of action exceed the amount paid by the User to
                  us, if any, that is related to the cause of action.
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
                  DISCLAIMER OF CONSEQUENTIAL DAMAGES
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  In no event shall Company or any parties, organizations or
                  entities associated with the corporate brand name us or
                  otherwise, mentioned at this Website be liable for any damages
                  whatsoever (including, without limitations, incidental and
                  consequential damages, lost profits, or damage to computer
                  hardware or loss of data information or business interruption)
                  resulting from the use or inability to use the Website and the
                  Website material, whether based on warranty, contract, tort,
                  or any other legal theory, and whether or not, such
                  organization or entities were advised of the possibility of
                  such damages.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 500, color: "#951e76" }}
                >
                  By choosing to login, you agree to accept all applicable terms
                  & conditions.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  You also give the following permission to TRUEVINE:
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  • To send SMS messages
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  • To read your text messages (SMS/MMS)
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  • To receive text messages (SMS)
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
