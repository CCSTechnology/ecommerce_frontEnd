import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import { Box, Container } from "@mui/material";
import Faliure from "../../../assets/images/failure.png";

const Error = ({ title }) => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <SuccessError title={"Faliure Payment"} path={Faliure} />
      </Box>
    </Container>
  );
};

export default Error;
