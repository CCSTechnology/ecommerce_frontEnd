import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import successImage from "../../../assets/images/payment-success.png";
import { Box, Container } from "@mui/material";

const Success = ({ title }) => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <SuccessError
          title={"Payment Successfully Completed"}
          path={successImage}
        />
      </Box>
    </Container>
  );
};

export default Success;
