import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import ImageUploadComponent from "../ImageUpload";

function MultipleImageUpload(props) {
  const { name, control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const imageUrl = import.meta.env.REACT_APP_IMG_URL;

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <ImageUploadComponent
            label={`Image ${index + 1}`}
            Controller={Controller}
            control={control}
            name={`${name}[${index}].image`}
          />
          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ backgroundColor: "#951e76" }}
        onClick={() => append({ image: null })}
        className="multiple-imageupload"
      >
        Add Image
      </Button>
    </div>
  );
}

export default MultipleImageUpload;
