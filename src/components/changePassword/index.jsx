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
  Card,
  CardContent,
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

export default function ChangePassword(props) {
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
    resolver: yupResolver(passwordForm),
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
      reset();
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
    // <Box
    //   sx={{
    //     flexGrow: 1,
    //     bgcolor: "background.paper",
    //     display: "flex",
    //     height: 224,
    //     marginTop: 4,
    //   }}
    // >
    <>
      <Box sx={{ fontSize: "20px", fontWeight: 600, mb: 3 }}>
        Change Password
      </Box>
      <Box>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(handlePasswordChange)}>
              <Box>
                <Grid container>
                  <Grid item xs={12} sx={{ mb: 3 }}>
                    <PasswordField
                      name="password"
                      control={control}
                      Controller={Controller}
                      error={errors?.password?.message}
                      label="Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} pt={2} sx={{ mb: 3 }}>
                    <PasswordField
                      name="new_password"
                      control={control}
                      Controller={Controller}
                      error={errors?.new_password?.message}
                      label="New Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} pt={2} sx={{ mb: 3 }}>
                    <PasswordField
                      name="confirm_password"
                      control={control}
                      Controller={Controller}
                      error={errors?.confirm_password?.message}
                      label="Confirm Password"
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box className="text-center-cls" sx={{ pt: 4 }}>
                <LoadingButton
                  loadingPosition="center"
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                  className="signup-button"
                  style={{ backgroundColor: "white", color: "#951e76" }}
                >
                  Change Password
                </LoadingButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
    // </Box>
  );
}
