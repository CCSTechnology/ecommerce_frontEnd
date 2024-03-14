import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FormInputText } from "../../../components/formField/TextField";
import MobileField from "../../../components/reusableFormFields/TextField/mobileField";
import { errorAlert } from "../../../helpers/globalFunctions";
import {
  guestAddAddress,
  publicAddAddress,
} from "../../../redux/api/public/authService";
import AddressPopup from "./addressPopup";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default React.memo(function BillingAddressForm({
  user,
  getMe,
  formHook,
  setGuestAllow,
  setUser,
  setBillData,
  billData,
  setDeliveryAddress,
  setNewData,
}) {
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(!user ? true : false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  // const [open, setOpen] = React.useState(false);
  const handleAddressEdit = () => setOpen(true);
  const [addrData, setAddrData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputs = React.useMemo(() => {
    return [
      {
        name: "name",
        label: "Name",
        show: true,
      },
      {
        name: "cart_id",
        label: "Cart Id",
        show: false,
      },
      {
        name: "phone_number",
        label: "Phone Number",
        type: "number",
        show: true,
      },
      {
        name: "same_address",
        label: "Same Address",
        type: "switch",
        show: false,
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        show: true,
      },
      {
        name: "country",
        label: "Country",
        show: true,
      },
      {
        name: "state",
        label: "State",
        show: true,
      },
      {
        name: "city",
        label: "City",
        show: true,
      },
      {
        name: "street_name",
        label: "Area",
        show: true,
      },
      {
        name: "line1",
        label: "Street Details",
        show: true,
      },
      {
        name: "zipcode",
        label: "Pincode",
        show: true,
      },
      {
        name: "address",
        label: "Address",
        show: false,
      },
    ];
  }, []);

  async function AddAddress(values) {
    values.is_default = 1;
    (values.address = "222 Citigate Drive, Barrhaven, ON, Canada"),
      (values.type = "Shipping Address");
    try {
      const details = {};
      values.same_address = true;
      values.cart_id = localStorage.getItem("cart_id") || null;
      const array = [
        "country",
        "state",
        "city",
        "street_name",
        "line1",
        "zipcode",
        "address",
      ];
      for (const [key, value] of Object.entries(values)) {
        if (array.includes(key)) {
          details[key] = value;
          delete values[key];
        }
      }
      values.address_details = [details];
      console.log(values);
      console.log([details]);
      const response = await dispatch(guestAddAddress(values)).unwrap();

      setGuestAllow({
        ...response,
        zipcode: details["zipcode"],
      });
      console.log(response);
      toast.success("Address Added");
      handleClose();
      setBillData(response);
      setAddrData(values);
    } catch (error) {
      errorAlert(error?.error);
    }
  }

  function handleEditAddress() {
    setEditAddress((state) => !state);
  }

  React.useEffect(() => {
    if (user) {
      formHook.reset({
        cart_id: localStorage.getItem("cart_id"),
        ...user,
      });
    } else {
      formHook.reset({
        cart_id: localStorage.getItem("cart_id"),
      });
    }
  }, [user]);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box>
      <Box>
        <Title>Billing Address</Title>

        <>
          {billData ? (
            <Grid container spacing={3}>
              <Grid item={12}>
                <Card sx={{ minHeight: 180, minWidth: { md: 450, xs: 300 } }}>
                  <CardContent>
                    <Grid container>
                      <Grid item>
                        {" "}
                        <LocationOnIcon />
                      </Grid>
                      <Grid item sx={{ pl: 3 }}>
                        <Typography component="div">
                          {addrData?.name}
                        </Typography>
                        <Typography component="div">
                          {addrData?.phone_number}
                        </Typography>
                        <Typography component="div">
                          {addrData?.address_details[0]?.street_name}
                        </Typography>
                        <Typography component="div">
                          {addrData?.address_details[0]?.line1}
                        </Typography>
                        <Typography component="div">
                          {addrData?.address_details[0]?.city}
                        </Typography>
                        <Typography component="div">
                          {addrData?.address_details[0]?.state}
                        </Typography>
                        <Typography component="div">
                          {addrData?.address_details[0]?.country}
                        </Typography>
                        <Typography component="div">
                          {addrData?.address_details[0]?.zipcode}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item={12}>
                {/* <Card sx={{ minHeight: 180, minWidth: { md: 700, xs: 300 } }}>
                  <CardContent> */}
                <Grid container>
                  <Grid item></Grid>
                  <Grid item sx={{ pl: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <LoadingButton
                        loadingPosition="center"
                        variant="contained"
                        // className="Submitbtn"
                        sx={{
                          backgroundColor: "#951e76",
                          mt: 2,
                          height: "50px",
                          fontSize: "20px",
                        }}
                        onClick={handleAddressEdit}
                      >
                        Add Address
                      </LoadingButton> */}
                    </Box>
                    {/* <Typography component="div">{user?.street_name}</Typography>
                    <Typography component="div">{user?.line1}</Typography>
                    <Typography component="div">{user?.city}</Typography>
                    <Typography component="div">{user?.state}</Typography>
                    <Typography component="div">{user?.country}</Typography>
                    <Typography component="div">{user?.zipcode}</Typography> */}
                  </Grid>
                </Grid>
                {/* </CardContent>
                </Card> */}
              </Grid>
            </Grid>
          )}

          {billData && (
            <LoadingButton
              loadingPosition="center"
              // loading={formHook.formState.isSubmitting}
              variant="contained"
              // fullWidth
              // className="Submitbtn"
              sx={{ backgroundColor: "#951e76", mt: 5 }}
              onClick={handleAddressEdit}
            >
              Edit Address
            </LoadingButton>
          )}
        </>

        {/* <Box
            sx={{
              my: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {billData ? (
              <LoadingButton
                loadingPosition="center"
                loading={formHook.formState.isSubmitting}
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#951e76" }}
              >
                Edit Address
              </LoadingButton>
            ) : (
              <LoadingButton
                loadingPosition="center"
                loading={formHook.formState.isSubmitting}
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#951e76" }}
              >
                Add Address
              </LoadingButton>
            )}
          </Box> */}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formHook.handleSubmit(AddAddress)}>
            {" "}
            <Grid container spacing={3}>
              {" "}
              {inputs.map((input, index) => {
                const { type, name, show, label } = input;
                if (show) {
                  switch (type) {
                    case "phone":
                      return (
                        <Grid item span={6} key={index}>
                          <MobileField
                            name={name}
                            control={formHook.control}
                            label="Mobile"
                            error={formHook.errors?.phone_number?.message}
                          />
                        </Grid>
                      );
                    default:
                      return (
                        <Grid item lg={6} key={index}>
                          <FormInputText
                            disabled={!editAddress}
                            control={formHook.control}
                            name={name}
                            label={label}
                            error={formHook.formState.errors?.[name]?.message}
                          />
                        </Grid>
                      );
                  }
                }
              })}
              <Grid item md={12}>
                {" "}
                <Box
                  sx={{
                    my: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {editAddress ? (
                    <LoadingButton
                      loadingPosition="center"
                      loading={formHook.formState.isSubmitting}
                      variant="contained"
                      type="submit"
                      // fullWidth
                      // className="Submitbtn"
                      sx={{ backgroundColor: "#951e76", mt: 2 }}
                    >
                      {user ? "Edit Address" : "Add Address"}
                    </LoadingButton>
                  ) : !formHook.formState.isValid ? (
                    <LoadingButton
                      loadingPosition="center"
                      loading={formHook.formState.isSubmitting}
                      variant="contained"
                      type="submit"
                      // fullWidth
                      // className="Submitbtn"
                      sx={{ backgroundColor: "#951e76" }}
                    >
                      Add Address
                    </LoadingButton>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  );
});

const Title = styled(Typography)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  margin-bottom: 10px;
  /* Body XXL/Body XXL, 500 */
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 36px */
`;

const AddressAction = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  margin: "10px 0",
}));
