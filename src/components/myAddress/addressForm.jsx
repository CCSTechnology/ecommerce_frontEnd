import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormHelperText,
  Avatar,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import TextFormField from "../reusableFormFields/TextField";
import FormLoader from "../formLoader";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import {
  addCustomerAddress,
  editCustomerAddress,
  viewCustomerAddress,
} from "../../redux/api/public/profileService";
import { errorAlert, successAlert } from "../../helpers/globalFunctions";
const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));
const label = { inputProps: { "aria-label": "Color switch demo" } };
const schema = yup.object().shape({
  // name: yup.string().required("Name is required"),
  // phone_number: yup.string().required("Phone number is required"),
  // email: yup.string().email().required("Emai is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  street_name: yup.string().required("Addres is required"),
  line1: yup.string().required("Address is required"),
  zipcode: yup.string().required("Pincode is required"),
  address: yup.string(),
});

const AddAddressForm = (props, disabled) => {
  const { onClick, initialData, type, item } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [adminsrole, setadminsRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState("");
  const [pinkSwitchChecked, setPinkSwitchChecked] = useState(false);
  const [adds, setAdds] = useState(null);
  console.log(adds);
  const dispatch = useDispatch();

  const formLoading = useSelector(
    (state) => state?.adminProduct?.viewProduct?.loading
  );
  const [essential, setEssential] = useState({
    cateLists: [],
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: type === "add" ? {} : adds,
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handlePinkSwitchChange = () => {
    setPinkSwitchChecked(!pinkSwitchChecked === false ? "0" : "1");
  };

  const viewAddressCustomer = async () => {
    try {
      const res = await dispatch(viewCustomerAddress(initialData)).unwrap();
      setAdds(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // Add Directory Api
  const handleAddProduct = async (values) => {
    console.log(values);
    const parameters = {
      ...values,
      type: "Shipping Address",
    };
    try {
      const response = await dispatch(addCustomerAddress(parameters)).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  const handleEditProduct = async (values) => {
    console.log(values);
    const { id, ...remvalues } = values;
    console.log(id);
    const parameters = {
      ...values,
    };
    try {
      const response = await dispatch(
        editCustomerAddress({ id, data: remvalues })
      ).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // delete image
  const handleDeleteImage = () => {
    setValue("image", null);
    setImages(null);
  };

  useEffect(() => {
    if (type === "edit") {
      viewAddressCustomer();
    }
  }, [type]);

  useEffect(() => {
    if (type !== "add") {
      if (adds) {
        reset(adds);
      } else {
        reset();
      }
    } else {
      reset();
    }
  }, [adds]);

  return (
    <Box sx={{ mx: 2 }}>
      {formLoading ? (
        <FormLoader />
      ) : (
        <form
          onSubmit={
            type === "add"
              ? handleSubmit(handleAddProduct)
              : handleSubmit(handleEditProduct)
          }
        >
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="line1"
                control={control}
                Controller={Controller}
                label="Line1"
                error={errors?.line1?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="street_name"
                control={control}
                Controller={Controller}
                label="Street Name"
                error={errors?.line1?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="city"
                control={control}
                Controller={Controller}
                label="City"
                error={errors?.city?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="state"
                control={control}
                Controller={Controller}
                label="State"
                error={errors?.state?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="country"
                control={control}
                Controller={Controller}
                label="Country"
                error={errors?.country?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="zipcode"
                control={control}
                Controller={Controller}
                label="Zipcode"
                error={errors?.zipcode?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="address"
                control={control}
                Controller={Controller}
                label="Address"
                error={errors?.address?.message}
              />
            </Grid>
            <Grid item xs={6}>
              {/* <PinkSwitch
                {...label}
                // defaultChecked
                // checked={pinkSwitchState === 1}
                onChange={handlePinkSwitchChange}
              /> */}
              <Controller
                name="is_default"
                control={control}
                defaultValue={
                  type === "add" ? false : adds?.is_default || false
                }
                render={({ field }) => (
                  <PinkSwitch
                    {...label}
                    {...field}
                    checked={pinkSwitchChecked} // Use the field value for the checked prop
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      setPinkSwitchChecked(e.target.checked);
                    }} // Update the field value on change
                    // onChange={handlePinkSwitchChange}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
            sx={{ p: 3 }}
          >
            <LoadingButton
              loadingPosition="center"
              loading={isSubmitting}
              variant="contained"
              type="submit"
              className="submitBtnn"
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default AddAddressForm;
