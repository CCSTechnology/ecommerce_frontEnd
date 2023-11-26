import {
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";

import React, { useState } from "react";

import ImgEmail from "../../../assets/images/email.png";
import { Link, useNavigate } from "react-router-dom";

const EmailForm = ({ title, path, url }) => {
  return (
    <Box>
      <Box className="text-center-cls">
        <img src={path} width={"200px"} height={"200px"} />
        <Typography className="welcomeHead">{title}</Typography>
        {url === "emailverification" ? (
          <Box sx={{ marginTop: 3 }}>
            <Link to="/login" className="link">
              <Button
                style={{ fontSize: "15px", fontWeight: 600, color: "#951e76" }}
                className="email-verify"
              >
                Redirect to Login
              </Button>
            </Link>
          </Box>
        ) : (
          <Box sx={{ marginTop: 3 }}>
            <Button
              style={{ fontSize: "15px", fontWeight: 600, color: "#951e76" }}
              className="email-verify"
            >
              Redirect to Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmailForm;
