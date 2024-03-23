import React from "react";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, FormHelperText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
function SelectFieldWithAdd({
  label,
  Controller,
  control,
  name,
  error,
  data,
  disabled,
  onAddButtonClick,
  delteApiFn,
}) {
  return (
    <>
      <Controller
        defaultValue={""}
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl error={error} className="select-with-add-nutri">
            <Typography variant="subtitle1" sx={{ fontSize: "13px" }}>
              {label}
            </Typography>
            <Select
              {...field}
              size={"small"}
              disabled={disabled}
              className="new-textfield"
            >
              {/* {data.map((options, i) => (
                <MenuItem
                  value={options.value}
                  key={i}
                  className="new-textfield-menu"
                >
                  {options.label}
                </MenuItem>
              ))} */}
              {Array.isArray(data) &&
                data.map((options, i) => (
                  <MenuItem
                    value={options.label}
                    key={i}
                    className="new-textfield-menu"
                  >
                    {options.label}
                    {!field.value || field.value !== options.label ? (
                      <CloseIcon
                        onClick={() => {
                          delteApiFn(options.value);
                        }}
                        sx={{ marginLeft: "auto", cursor: "pointer" }}
                      />
                    ) : null}
                  </MenuItem>
                ))}

              <Button
                variant="contained"
                sx={{ mt: 2, width: "151px", mb: 0 }}
                onClick={onAddButtonClick}
              >
                <AddIcon />
                ADD
              </Button>
            </Select>

            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
}

export default SelectFieldWithAdd;
