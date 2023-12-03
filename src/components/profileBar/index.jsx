import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Password } from "@mui/icons-material";
import PasswordField from "../reusableFormFields/TextField/passwordField";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import {
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import TextFormField from "../reusableFormFields/TextField";
import MobileField from "../reusableFormFields/TextField/mobileField";
import {
  addCustomerAddress,
  customerPasswordChange,
  myProfileUpdate,
} from "../../redux/api/public/profileService";
import { errorAlert, successAlert } from "../../helpers/globalFunctions";
import { logo } from "../../helpers/images";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { addressForm, passwordForm, profileForm } from "../../helpers/validate";
import { yupResolver } from "@hookform/resolvers/yup";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function VerticalTabs(props) {
  const [valueData, setValueData] = useState("1");
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValueData(newValue);
  };

  const initialvalue = useSelector(
    (state) => state?.myProfile.myProfileView?.data
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialvalue,
    resolver: yupResolver(profileForm),
    mode: "onChange",
  });

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    control: control1,
    setValue: setValue1,
    getValues: getValues1,
    reset: reset1,
    watch: watch1,
    formState: { errors: errors1, isSubmitting: isSubmitting1 },
  } = useForm({
    // defaultValues: initialvalue,
    resolver: yupResolver(passwordForm),
    mode: "onChange",
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control: control2,
    setValue: setValue2,
    getValues: getValues2,
    reset: reset2,
    watch: watch2,
    formState: { errors: errors2, isSubmitting: isSubmitting2 },
  } = useForm({
    // defaultValues: initialvalue,
    resolver: yupResolver(addressForm),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddProduct = async (values) => {
    console.log(values);
    const { mobile, first_name, last_name } = values;
    const data = {
      mobile: mobile,
      first_name: first_name,
      last_name: last_name,
    };
    console.log(data);
    try {
      const res = await dispatch(myProfileUpdate(data)).unwrap();
      successAlert(res.message);
    } catch (error) {
      errorAlert(error.error);
    }
  };

  const handlePasswordChange = async (values) => {
    console.log(values);
    const { password, new_password, confirm_password } = values;
    const data1 = {
      password: password,
      new_password: new_password,
      confirm_password: confirm_password,
    };
    try {
      const res = await dispatch(customerPasswordChange(data1)).unwrap();
      successAlert(res.message);
      reset1();
    } catch (error) {
      errorAlert(error.error);
    }
  };
  const handleCheck = (value) => {
    // Handle the switch change
    console.log(value);
    // setValue("is_default", e.target.checked);
  };

  const handleAddAddress = async (values) => {
    console.log(values);
    // const { street_name, city, address, state, line1, zipcode, country } =
    //   values;
    const data1 = {
      ...values,
      type: 1,
    };
    console.log(data1);
    try {
      const res = await dispatch(addCustomerAddress(data1)).unwrap();
      successAlert(res.message);
      // reset();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  useEffect(() => {
    if (initialvalue) {
      reset(initialvalue);
    }
  }, [initialvalue]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        marginTop: 4,
      }}
    >
      {" "}
      <TabContext value={valueData}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            orientation="vertical"
          >
            <Tab
              label="My Profile"
              value="1"
              sx={{ color: "black", textAlign: "start" }}
            />
            {/* <Tab label="My Orders" value="2" sx={{ color: "black" }} /> */}
            {/* <Tab label="Change Password" value="3" sx={{ color: "black" }} /> */}
            <Tab label="My Address" value="4" sx={{ color: "black" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ fontSize: "20px", fontWeight: 600 }}>
            My Profile Update
          </Box>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={6}>
                <TextFormField
                  name="first_name"
                  control={control}
                  Controller={Controller}
                  label="First Name"
                  error={errors?.first_name?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFormField
                  name="last_name"
                  control={control}
                  Controller={Controller}
                  label="Last Name"
                  error={errors?.last_name?.message}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={6}>
                <TextFormField
                  name="email"
                  control={control}
                  Controller={Controller}
                  label="Email"
                  error={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileField
                  name="mobile"
                  control={control}
                  Controller={Controller}
                  label="Mobile"
                  error={errors?.mobile?.message}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">+61</InputAdornment>
                  //   ),
                  // }}
                />
              </Grid>
            </Grid>
            <Box className="text-center-cls" sx={{ my: 4 }}>
              <LoadingButton
                loadingPosition="center"
                loading={isSubmitting}
                variant="contained"
                type="submit"
                className="signup-button"
                style={{ backgroundColor: "white", color: "#951e76" }}
              >
                Update
              </LoadingButton>
            </Box>
          </form>
        </TabPanel>
        <TabPanel value="2">
          <TableContainer className="rolesPageTable" fullWidth>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">URL</TableCell>
                  <TableCell align="left">Actions</TableCell>
                  {/* <TableCell align="left">Status</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">1</TableCell>
                  <TableCell align="left">aaa</TableCell>
                  <TableCell align="left">
                    eee{" "}
                    {/* <img src={imageUrl + item.image} width="200px"></img> */}
                  </TableCell>
                  <TableCell align="left">vvvv</TableCell>
                  <TableCell align="center">
                    <Stack
                      direction={"row"}
                      gap={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EditIcon
                        className="table-icons"
                        // onClick={() => editDirectory(item.id)}
                      />
                      <DeleteIcon
                        className="table-icons"
                        // onClick={() => deleteDirectory(item.id)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="3">
          <form onSubmit={handleSubmit1(handlePasswordChange)}>
            <Box>
              <Grid container>
                <Grid item xs={12}>
                  <PasswordField
                    name="password"
                    control={control1}
                    Controller={Controller}
                    error={errors1?.password?.message}
                    label="Password"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} pt={2}>
                  <PasswordField
                    name="new_password"
                    control={control1}
                    Controller={Controller}
                    error={errors1?.new_password?.message}
                    label="New Password"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} pt={2}>
                  <PasswordField
                    name="confirm_password"
                    control={control1}
                    Controller={Controller}
                    error={errors1?.confirm_password?.message}
                    label="Confirm Password"
                    type="password"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="text-center-cls" sx={{ pt: 4 }}>
              <LoadingButton
                loadingPosition="center"
                loading={isSubmitting1}
                variant="contained"
                type="submit"
                className="signup-button"
                style={{ backgroundColor: "white", color: "#951e76" }}
              >
                Change Password
              </LoadingButton>
            </Box>
          </form>
        </TabPanel>
        <TabPanel value="4">
          <form onSubmit={handleSubmit2(handleAddAddress)}>
            <Box>
              <Box sx={{ fontSize: "20px" }}>My Address Update</Box>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="address"
                    control={control2}
                    Controller={Controller}
                    label="Address"
                    error={errors2?.address?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="line1"
                    control={control2}
                    Controller={Controller}
                    label="Line1"
                    error={errors2?.line1?.message}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="street_name"
                    control={control2}
                    Controller={Controller}
                    label="Street Name"
                    error={errors2?.street_name?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="city"
                    control={control2}
                    Controller={Controller}
                    label="City"
                    error={errors2?.city?.message}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="state"
                    control={control2}
                    Controller={Controller}
                    label="State"
                    error={errors2?.state?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="country"
                    control={control2}
                    Controller={Controller}
                    label="Country"
                    error={errors2?.country?.message}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12} md={6}>
                  <TextFormField
                    name="zipcode"
                    control={control2}
                    Controller={Controller}
                    label="ZipCode"
                    error={errors2?.zipcode?.message}
                  />
                </Grid>
              </Grid>
              {/* <Grid item xs={12} md={6}>
               
                <FormControlLabel
                  style={{ paddingTop: "23px" }}
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label="is_default"
                />
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <FormControlLabel
                  style={{ paddingTop: "23px" }}
                  control={
                    <Controller
                      name="is_default"
                      control={control2}
                      // defaultValue={false} // Set the default value for the switch
                      render={({ field }) => (
                        <IOSSwitch
                          {...field}
                          sx={{ m: 1 }}
                          onChange={() => handleCheck(field.value)}
                          checked={field.value}
                        />
                      )}
                    />
                  }
                  label="is_default"
                />
              </Grid> */}
              <Box className="text-center-cls" sx={{ my: 4 }}>
                <LoadingButton
                  loadingPosition="center"
                  loading={isSubmitting2}
                  variant="contained"
                  type="submit"
                  className="signup-button"
                  style={{ backgroundColor: "white", color: "#951e76" }}
                >
                  Update
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
