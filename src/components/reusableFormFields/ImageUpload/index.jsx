import React from "react";
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useController } from "react-hook-form";

function ImageUploadComponent(props) {
  const { label, Controller, control, name, setValue, error } = props;
  const { field } = useController({ name: name, control: control });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      field.onChange(file);
    }
  };
  const imageUrl = import.meta.env.REACT_APP_IMG_URL;
  // const handleDeleteImage = () => {
  //     setValue(name, '')
  // };

  return (
    <>
      {/* <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    console.log('field.value', field.value), */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontSize: "13px" }}>
          {label}
        </Typography>
        <Stack direction={"horizontal"} gap={2} error={error}>
          <Box>
            <Button
              variant=""
              component="label"
              endIcon={field.value ? <EditIcon /> : <AddIcon />}
              sx={{ backgroundColor: "white", color: "#B2BEB5" }}
            >
              <Typography variant="">
                {" "}
                {field.value ? "Edit Image" : "Add Image"}
              </Typography>
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>

          {field.value && (
            <Avatar
              src={
                typeof field.value === "string"
                  ? imageUrl + field.value
                  : URL?.createObjectURL(field?.value)
              }
            />
          )}
          {field.value && (
            <IconButton onClick={() => field.onChange("")}>
              <DeleteIcon className="delete-icons" />
            </IconButton>
          )}
        </Stack>
        <FormHelperText>{error}</FormHelperText>
      </Box>
      {/* )}
            /> */}
    </>
  );
}

export default ImageUploadComponent;
