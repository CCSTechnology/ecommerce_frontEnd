import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, FormHelperText, Typography } from "@mui/material";
import dayjs from "dayjs";

function DatePickerComponent(props) {
  const { label, Controller, control, name, error, disabled } = props;
  return (
    <>
      <Controller
        defaultValue={""}
        name={name}
        control={control}
        render={({ field }) => (
          <Box>
            <Typography variant="subtitle1">{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  {...field}
                  disabled={disabled}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                  value={dayjs(field.value)}
                  className={error ? "class-1" : "class-2"}
                  onChange={(e) =>
                    field.onChange(dayjs(e).format("YYYY/MM/DD"))
                  }
                />
              </DemoContainer>
              <FormHelperText className="errorMsg">{error}</FormHelperText>
            </LocalizationProvider>
          </Box>
        )}
      />
    </>
  );
}

export default DatePickerComponent;
