import { Container, styled } from "@mui/material";
import React from "react";

const StyledContainerNew = ({ children }) => {
  return (
    <MuiContainer
      maxWidth="lg"
      sx={{ maxWidth: { xl: "88% !important", lg: "88%" } }}
      disableGutters
    >
      {children}
    </MuiContainer>
  );
};

export default StyledContainerNew;

const MuiContainer = styled(Container)`
  /* overflow: hidden; */
`;
