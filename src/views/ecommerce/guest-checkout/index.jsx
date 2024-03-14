import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartViewServices,
  checkOutWithGuest,
  checkOutWithUser,
  getDeliveryCharge,
  paymentStatusChange,
} from "../../../redux/api/public/cartServices";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CustomBreadcrumbs from "../../../components/ecommerce/Breadcrumps";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import { publicGetMe } from "../../../redux/api/public/authService";
import OrderSummary from "./OrderSummary";
import BillingAddressForm from "./addressForm";
import { toast } from "react-toastify";
import { errorAlert } from "../../../helpers/globalFunctions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Slide from "@mui/material/Slide";
import BasicCard from "./cardAddress";
import { LineWeight } from "@mui/icons-material";
import { logout } from "../../../redux/api/admin/authService";
import { LoadingButton } from "@mui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone_number: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Emai is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  street_name: yup.string().required("Addres is required"),
  line1: yup.string().required("Address is required"),
  zipcode: yup.string().required("Pincode is required"),
  address: yup.string(),
});

export default memo(function GetLoginCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popUp, setPopup] = useState(false);
  const { data: cartData } = useSelector(
    (state) => state.cart.cartViewServices
  );
  const [cartList, setCartList] = useState(null);
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [billData, setBillData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [addrData, setAddrData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const breadcrumbs = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Cart",
      link: "/cart",
    },
    {
      label: "Checkout",
    },
  ];

  const cartId = localStorage.getItem("cart_id") || null;
  const [guestAllow, setGuestAllow] = useState(null);
  console.log(guestAllow);
  async function getCartList(value) {
    try {
      const response = await dispatch(
        cartViewServices({
          cart_id: cartId,
        })
      ).unwrap();
      setCartList(response || null);
    } catch (error) {
      setCartList(null);
    }
  }

  const { handleSubmit } = useForm({
    defaultValues: {},
  });

  const { ...formHook } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  async function handleCheckOut() {
    try {
      //Valid User
      if (user) {
        const response = await dispatch(
          checkOutWithUser({
            billing_address_id: user?.id,
            shipping_address_id: user?.id,
            delivery_charges: delivery?.amount,
            courier_name: delivery?.courier_name,
            cart_id: "",
          })
        ).unwrap();
        window.location.href = response.payment_details;
      }
      //Expries Token
      else {
        setPopup(true);
      }
    } catch (error) {
      errorAlert(error?.error);
    }
  }

  const onSuccessCallback = async (values) => {
    console.log(values);
    let formData = {
      // razorpay_payment_id: data?.razorpay_payment_id,
      // razorpay_order_id: getLocalStorage(CONSTANTS.V_ORDER),
      // razorpay_signature: data.hasOwnProperty("razorpay_signature")
      //   ? data?.razorpay_signature
      //   : null,
      razor_response: values,
    };
    const response = await dispatch(paymentStatusChange(formData)).unwrap();
    console.log(response);
    // paymentStatusChange(formData, {
    //   onSuccess: (response) => {
    //     navigate(`/`, {
    //       replace: true,
    //     });
    //   },
    //   onError: (error) => {
    //     console.log(error);
    //   },
    // });
  };
  const triggerPaymentRazorpay = (response) => {
    // e.preventDefault();
    console.log(response);
    const options = {
      key: import.meta.env.VITE_APP_RAZOR_KEY,
      currency: "INR",
      amount: Math.round(response?.payment_details?.amount),
      name: "Truevine Payment",
      description: "Payment Transaction",
      // image: "/assets/footer_logo.png",
      order_id: response?.payment_details?.order_id,
      handler: function (response) {
        navigate(`/payment-success`, {
          replace: true,
        });
        console.log(response);
        onSuccessCallback(response);
      },
      prefill: {
        name: "xxx",
        email: "xx@gmail.com",
        contact: "98987676",
      },
    };

    // const paymentObject = new window.Razorpay(options);
    const paymentObject = new Razorpay(options);
    paymentObject.open();
  };

  async function handleCheckOutGuest(values) {
    try {
      const {
        trigger,
        formState: { isValid },
      } = formHook;

      // if (isValid) {
      const response = await dispatch(
        checkOutWithGuest({
          billing_address_id: guestAllow?.billing_id,
          shipping_address_id: guestAllow?.billing_id,
          cart_id: cartId,
          delivery_charges: delivery?.amount,
          courier_name: delivery?.courier_name,
          guest_id: guestAllow?.billing_id,
        })
      ).unwrap();
      triggerPaymentRazorpay(response);
      // window.location.href = response.payment_details;
      // }
      // else {
      //   trigger();
      //   toast.info("Please Add Address");
      // }
    } catch (error) {
      errorAlert(error?.error);
    }
  }
  async function handleGetDeliveryGuest(values) {
    try {
      const response = await dispatch(
        getDeliveryCharge({
          pincode: values?.zipcode,
          weight: cartList?.total_weight,
          cod: false,
        })
      ).unwrap();
      setDelivery(response);
    } catch (error) {
      errorAlert(error?.error);
    }
  }

  async function getMe() {
    try {
      const response = await dispatch(publicGetMe()).unwrap();
      const { email, mobile, first_name, last_name, addresses } = response;
      const address = {};
      addresses?.forEach((addres) => {
        if (addres.is_default === 1) {
          for (const [key, value] of Object.entries(addres)) {
            address[key] = value;
          }
        }
      });
      const dat = {
        id: address?.id || null,
        name: first_name + last_name ? ` ${last_name}` : "",
        phone_number: mobile,
        same_address: 0,
        email: email,
        country: address?.country || "",
        state: address?.state || "",
        city: address?.city || "",
        street_name: address?.street_name || "",
        line1: address?.line1 || "",
        zipcode: address?.zipcode || "",
        address: address?.address || "",
      };

      setUser(dat);
    } catch (error) {}
  }

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (user) {
      handleGetDeliveryGuest(user);
    }
    if (guestAllow) {
      handleGetDeliveryGuest(guestAllow);
    }
  }, [user, guestAllow]);

  useEffect(() => {
    if (cartData) {
      setCartList(cartData);
    }
  }, [cartData]);

  return (
    <StyledContainer>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <CardTitle>Check Out</CardTitle>

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          sx={{
            ml: 3,
            p: { md: 10, xs: 3 },
          }}
          className="new-checkout"
        >
          {/* {!billData ? (
            <>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LoadingButton
                  loadingPosition="center"
                  variant="contained"
                  className="Submitbtn"
                  sx={{
                    backgroundColor: "#951e76",
                    mt: 2,
                    height: "50px",
                    fontSize: "20px",
                  }}
                  onClick={handleClickOpen}
                >
                  Add Address
                </LoadingButton>
              </Box>
              <BillingAddressForm
                open={open}
                handleClose={handleClose}
                formHook={formHook}
                billData={billData?.billing_id}
              />
            </>
          ) : (
            <BillingAddressForm
              formHook={formHook}
              user={user}
              setUser={setUser}
              getMe={getMe}
              setGuestAllow={setGuestAllow}
              billData={billData?.billing_id}
              setBillData={setBillData}
            />
          )} */}
          <BillingAddressForm
            formHook={formHook}
            user={user}
            setUser={setUser}
            getMe={getMe}
            setGuestAllow={setGuestAllow}
            billData={billData?.billing_id}
            setBillData={setBillData}

            // Pass the function here
          />
          {/* <BasicCard handleOpen={handleOpen} addrData={addrData} /> */}
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <OrderSummary
            loading={formHook.formState.isSubmitting}
            valid={formHook.formState.isValid}
            checkout={cartList}
            guest={guestAllow}
            delivery={delivery}
            handleSubmit={handleSubmit}
            handleCheckOut={handleCheckOut}
            handleCheckOutGuest={handleCheckOutGuest}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
});

const CardTitle = styled(Typography)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  text-align: center;

  /* Heading 05/Heading 05 — 600 */
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 38.4px */
`;
