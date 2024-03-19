import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";

function TextFormField(props) {
  const {
    label,
    placeholder,
    Controller,
    control,
    name,
    error,
    type,
    size,
    variant,
    disabled,
    sx,
  } = props;
  return (
    <>
      <Controller
        defaultValue={""}
        name={name}
        control={control}
        render={({ field }) => (
          <Box>
            <Typography variant="subtitle1" sx={{ fontSize: "13px" }}>
              {label}
            </Typography>
            <TextField
              fullWidth
              variant={variant && variant}
              size={size ? size : "small"}
              placeholder={placeholder}
              error={error}
              type={type}
              helperText={error}
              {...field}
              disabled={disabled}
              sx={sx}
              className="new-textfield"
              // sx={{ backgroundColor: "white", width: "100%" }}
            />
          </Box>
        )}
      />
    </>
  );
}

export default TextFormField;
