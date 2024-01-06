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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Dialog,
  DialogTitle,
  Divider,
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
import { errorAlert, successAlert } from "../../helpers/globalFunctions";
import {
  addCustomerAddress,
  customerPasswordChange,
  deleteCustomerAddress,
  getCustomerAddress,
  getPrimaryAddress,
  myProfileUpdate,
} from "../../redux/api/public/profileService";

import { logo } from "../../helpers/images";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { addressForm, passwordForm, profileForm } from "../../helpers/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledContainer from "../ecommerce/StyledContainer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import AddAddressForm from "./addressForm";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DeleteModal from "../deleteModal";
const label = { inputProps: { "aria-label": "Color switch demo" } };
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyAddress(props) {
  const [valueData, setValueData] = useState("1");
  const dispatch = useDispatch();
  const [addType, setAddType] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [delid, setDelId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const addressCustomer = useSelector(
    (state) => state?.myProfile.getCustomerAddress?.data
  );

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setValue,
  //   getValues,
  //   reset,
  //   watch,
  //   formState: { errors, isSubmitting },
  // } = useForm({
  //   defaultValues: initialvalue,
  //   resolver: yupResolver(addressForm),
  //   mode: "onChange",
  // });
  const handleButtonClick = async () => {
    handleClose(); // Call handleClose to close the form
    await listCustomerAddress();
  };
  const handleClickOpen = () => {
    // setSingleData(null);
    setOpen(true);
    setAddType("add");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editDirectory = (id) => {
    // setSingleData(row);
    setEditId(id);
    console.log(id);
    setOpen(true);
    setAddType("edit");
  };

  const deleteDirectory = (id) => {
    setDelId(id);
    setDeleteModalOpen(true);
  };

  const deleteDirectoryModalClose = () => {
    setDeleteModalOpen(false);
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

  const listCustomerAddress = async (values) => {
    try {
      const res = await dispatch(getCustomerAddress()).unwrap();
      successAlert(res.message);
      console.log(res);
      // reset();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  const removeCustomerAddress = async () => {
    try {
      const res = await dispatch(deleteCustomerAddress(delid)).unwrap();
      successAlert(res.message);
      listCustomerAddress();
      // reset();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  const handleSwitchChange = async (item) => {
    const { id, is_default, ...values } = item;
    try {
      const res = await dispatch(getPrimaryAddress(id)).unwrap();
      listCustomerAddress();
      successAlert(res.message);
      console.log(res);

      // reset();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  useEffect(() => {
    listCustomerAddress();
  }, []);

  // useEffect(() => {
  //   if (initialvalue) {
  //     reset(initialvalue);
  //   }
  // }, [initialvalue]);

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
    // <Container sx={{ maxWidth: "800px!important" }}>
    //   <form onSubmit={handleSubmit(handleAddAddress)}>
    //     <Box>
    //       <Box sx={{ fontSize: "20px", fontWeight: 600 }}>
    //         My Address Update
    //       </Box>
    //       <Grid container spacing={3} mt={1}>
    //         <Grid item xs={12} md={6}>
    //           {" "}
    //           <TextFormField
    //             name="line1"
    //             control={control}
    //             Controller={Controller}
    //             label="Line1"
    //             error={errors?.line1?.message}
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //           <TextFormField
    //             name="street_name"
    //             control={control}
    //             Controller={Controller}
    //             label="Street Name"
    //             error={errors?.street_name?.message}
    //           />
    //         </Grid>
    //       </Grid>
    //       <Grid container spacing={3} mt={1}>
    //         <Grid item xs={12} md={6}>
    //           <TextFormField
    //             name="city"
    //             control={control}
    //             Controller={Controller}
    //             label="City"
    //             error={errors?.city?.message}
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //           <TextFormField
    //             name="state"
    //             control={control}
    //             Controller={Controller}
    //             label="State"
    //             error={errors?.state?.message}
    //           />
    //         </Grid>
    //         <Grid container spacing={3} mt={1}></Grid>
    //         <Grid item xs={12} md={6}>
    //           <TextFormField
    //             name="country"
    //             control={control}
    //             Controller={Controller}
    //             label="Country"
    //             error={errors?.country?.message}
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //           <TextFormField
    //             name="zipcode"
    //             control={control}
    //             Controller={Controller}
    //             label="ZipCode"
    //             error={errors?.zipcode?.message}
    //           />
    //         </Grid>
    //       </Grid>
    //       <Grid container spacing={3} mt={1}>
    //         <Grid item xs={12} md={6}>
    //           <TextFormField
    //             name="address"
    //             control={control}
    //             Controller={Controller}
    //             label="Address"
    //             error={errors?.address?.message}
    //           />
    //         </Grid>
    //       </Grid>

    //       <Box className="text-center-cls" sx={{ my: 4 }}>
    //         <LoadingButton
    //           loadingPosition="center"
    //           loading={isSubmitting}
    //           variant="contained"
    //           type="submit"
    //           className="signup-button"
    //           style={{ backgroundColor: "white", color: "#951e76" }}
    //         >
    //           Update
    //         </LoadingButton>
    //       </Box>
    //     </Box>
    //   </form>
    // </Container>
    <StyledContainer>
      <MyOrdersWrapper>
        <Title variant="h4">My Addresses</Title>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            margin: "auto",
            maxWidth: "50%",
          }}
        >
          {addressCustomer?.map((item, index) => {
            return (
              <Accordion elevation={4}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  key={index}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center ",
                      fontSize: "20px",
                      fontWeight: 400,
                    }}
                  >
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md={8}
                        lg={8}
                        sx={{
                          width: "600px",
                          // display: "flex",
                          // alignItems: "center",
                        }}
                      >
                        {item.address}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={4}
                        lg={4}
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Switch
                          {...label}
                          color="secondary"
                          checked={item.is_default}
                          onChange={() => handleSwitchChange(item)}
                        />
                      </Grid>
                    </Grid>

                    <Grid item md={12} lg={12} xs={12}>
                      {item.zipcode}
                    </Grid>
                    <Grid item md={12} lg={2}>
                      {/* {address.state} */}
                    </Grid>
                  </Box>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  {/* <Grid container justifyContent={"space-between"}>
                    <Grid item md={12} lg={12}>
                      {item.address}
                    </Grid>
                    <Grid item md={12} lg={12}>
                      {item.zipcode}
                    </Grid>
                    <Grid item md={12} lg={2}></Grid>
                  </Grid>

                  <Divider /> */}
                  <Grid container>
                    <Grid
                      item
                      md={6}
                      lg={6}
                      xs={12}
                      sx={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "end",
                      }}
                    >
                      <EditIcon
                        className="table-icons1"
                        onClick={() => editDirectory(item.id)}
                        style={{ color: "#951e76", cursor: "pointer" }}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      lg={6}
                      xs={12}
                      sx={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                    >
                      <DeleteIcon
                        className="table-icons1"
                        onClick={() => deleteDirectory(item.id)}
                        style={{ color: "#951e76", cursor: "pointer" }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
          {/* <Box> */}
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="addresss-box"
            >
              <AddIcon
                style={{
                  color: "#951e76",
                  fontSize: "40px",
                  cursor: "pointer",
                }}
                onClick={handleClickOpen}
              />
            </Grid>
          </Grid>
          {/* </Box> */}
        </Box>
      </MyOrdersWrapper>
      {open === true ? (
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box> {"Add Address"}</Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>

          <AddAddressForm
            onClick={handleButtonClick}
            initialData={editId}
            type={addType}
          />
        </Dialog>
      ) : null}

      {deleteModalOpen && (
        <DeleteModal
          open={deleteModalOpen}
          close={() => deleteDirectoryModalClose()}
          title={"Delete Product"}
          content={"Are you sure want to delete this address?"}
          submit={removeCustomerAddress}
          // loading={stateValues.deleteLoading}
        />
      )}
    </StyledContainer>

    // </Box>
  );
}
const MyOrdersWrapper = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Typography)`
  text-align: center;
  font-weight: 500;
  margin-bottom: 30px;
`;

const OrderId = styled(Typography)`
  text-align: center;
  font-weight: 500;
`;
