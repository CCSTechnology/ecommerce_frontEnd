/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge, Box, Container, Grid, IconButton, Stack } from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import React, { useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch } from "react-redux";
import { getMe, updateMeData } from "redux/api/services/profileService";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "components/formField/TextField";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { ProfileUpdateSchema } from "helpers/validate";
import TextFormField from "components/reusableFormFields/TextField";
import AddressField from "components/reusableFormFields/AddressField/addressField";
import { AddressFormater } from "helpers/global";

const EditProfile = (disabled) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState([]);
  const [url, setUrl] = useState("")
  const roleName = localStorage.getItem("roleName");
  const [getdata, setGetdata] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // hook form
  const {
    isSubmitting,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    // defaultValues:{}
    resolver: yupResolver(ProfileUpdateSchema),
    mode: "onChange"
  });



  const handleFormChange = (name, value) => {
    setGetdata((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleFiles = (event) => {
    const temp = event.target.files
    if (temp.length > 0) {
      const file = temp[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        setFile(temp)
        setUrl(base64String)
      };
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  // update
  const handleEdit = async (data) => {
    const {
      city,
      code,
      created_at,
      created_by,
      deleted_at,
      id,
      name,
      role,
      role_name,
      state,
      status,
      updated_at,
      updated_by,
      image,
      ...others
    } = data;

    const formatedAddress = AddressFormater(data.address)

    if (file.length >= 1) {
      others.image = file[0];

    }

    const parameter = {
      url: authEndPoints.profile.updateme,
      data: {
        ...others,
        ...formatedAddress
      }
    };
    try {
      const response = await dispatch(updateMeData(parameter)).unwrap();
      successAlert(response?.message);
      navigate(`/${roleName}/myProfile`);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getMe({ url: authEndPoints.profile.getme })).unwrap();
        // Set default values based on the response
        setGetdata(response.data);
        setUrl(response.data.image)
        reset(response.data); // Assuming the response contains the default values
      } catch (errors) {
        // Handle error
        errorAlert(errors?.error);
      }
    };
    fetchData();
  }, []);



  return (
    <Box className="indexBox">
      <TopBreaccrumb title={"Edit Profile"} to={`/${roleName}/dashboard`} />

      <Grid container spacing={2} sx={{ my: 4 }} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6} sx={{ backgroundColor: "#ddf0dd" }}>
          <Container maxWidth="xs">
            <form onSubmit={handleSubmit(handleEdit)}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <Avatar
                        sx={{
                          backgroundColor: "#d9d9d9",
                          width: 25,
                          height: 25,
                          color: "#666666",
                        }}
                      >
                        {/* <AddPhotoAlternateIcon /> */}
                        <IconButton onClick={handleButtonClick}>
                          <AddPhotoAlternateIcon />
                        </IconButton>

                        <input
                          type="file"
                          onChange={handleFiles}
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                      </Avatar>
                    }
                  >
                    <Avatar
                      alt={getdata?.name}
                      src={url}
                      sx={{
                        width: 111,
                        height: 110,
                        backgroundColor: "#c1cfc1",
                      }}
                    />
                  </Badge>
                  {/* <Grid item xs={12} direction={"column"} sx={{ marginTop: 2 }}>

                    <FormInputText
                      name={"email"}
                      control={control}
                      label={""}
                      error={errors?.email?.message}
                      value={getdata?.email}
                    // onChange={(e) => handleFormChange("first_name", e.target.value)}
                    />
                  </Grid> */}
                </Grid>


                <Grid item xs={12} direction={"column"}>
                  <TextFormField
                    placeholder=""
                    name="first_name"
                    control={control}
                    Controller={Controller}
                    error={errors?.first_name?.message}
                    label="First Name"
                    type="text"
                    onChange={(e) => handleFormChange("first_name", e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} direction={"column"}>
                  <TextFormField
                    placeholder=""
                    name="last_name"
                    control={control}
                    Controller={Controller}
                    error={errors?.last_name?.message}
                    label="Last Name"
                    type="text"
                    onChange={(e) => handleFormChange("last_name", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} direction={"column"}>
                  <TextFormField
                    placeholder=""
                    name="email"
                    control={control}
                    Controller={Controller}
                    error={errors?.email?.message}
                    label="Email"
                    type="text"
                    disabled={disabled}
                  // onChange={(e) => handleFormChange("last_name", e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} direction={"column"}>
                  <TextFormField
                    placeholder=""
                    name="role_name"
                    control={control}
                    Controller={Controller}
                    error={errors?.role_name?.message}
                    label="Role"
                    type="text"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12} direction={"column"}>
                  <TextFormField
                    placeholder=""
                    name="mobile"
                    control={control}
                    Controller={Controller}
                    error={errors?.mobile?.message}
                    label="Mobile"
                    type="text"
                    onChange={(e) => handleFormChange("mobile", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} direction={"column"}>
                  <AddressField
                    placeholder="Enter Address"
                    name="address"
                    control={control}
                    Controller={Controller}
                    error={errors?.address?.message}
                    required={true}
                    label="Address"
                    type="text"
                    onChange={(e) => handleFormChange("address", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} direction={"column"} sx={{ mb: 4 }}>
                  <TextFormField
                    placeholder=""
                    name="zip_code"
                    control={control}
                    Controller={Controller}
                    error={errors?.zip_code?.message}
                    label="Zip Code"
                    type="text"
                    onChange={(e) => handleFormChange("zip_code", e.target.value)}
                  />
                </Grid>
              </Grid>
              <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5} sx={{ p: 3 }}>
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
          </Container>
        </Grid >
      </Grid >
    </Box >
  );
};

export default EditProfile;