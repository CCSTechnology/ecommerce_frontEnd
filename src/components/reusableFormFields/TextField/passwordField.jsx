import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordField(props) {
  const {
    label,
    placeholder,
    Controller,
    control,
    name,
    error,
    size,
    variant,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  // visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Controller
        defaultValue={""}
        name={name}
        control={control}
        render={({ field }) => (
          <Box>
            <Typography variant="subtitle1">{label}</Typography>
            <TextField
              fullWidth
              variant={variant && variant}
              size={size ? size : "small"}
              // sx={{ backgroundColor: "white", width: "100%" }}
              type={showPassword ? "text" : "password"}
              helperText={error}
              error={error}
              {...field}
              placeholder={placeholder}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      />
    </>
  );
}

export default PasswordField;
