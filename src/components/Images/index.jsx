import { Box } from "@mui/material";
import React from "react";

function ImageComponent({ src, alt }) {
  return (
    <Box className="login-logo">
      <img
        src={src}
        alt={alt}
        style={{ width: { md: "400px" }, height: "200px" }}
      />
    </Box>
  );
}

export default ImageComponent;
