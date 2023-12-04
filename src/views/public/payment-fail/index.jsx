import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import { Box, Button, Container } from "@mui/material";
import Faliure from "../../../assets/images/failure.png";
import { Link } from "react-router-dom";

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
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/" className="link">
            <Button
              style={{ fontSize: "15px", fontWeight: 600, color: "#951e76" }}
              className="email-verify"
            >
              Redirect to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Error;
