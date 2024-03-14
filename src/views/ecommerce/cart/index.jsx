import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CustomBreadcrumbs from "../../../components/ecommerce/Breadcrumps";
import CartProductCard from "./CartProductCard";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import { useDispatch, useSelector } from "react-redux";
import { cartViewServices } from "../../../redux/api/public/cartServices";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { logo } from "../../../helpers/images";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [popUp, setPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [guestAllow, setGuestAllow] = useState(null);
  const handleClickOpen = () => {
    // setOpen(true);
    setPopup(false);
    navigate("/guest-checkout");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { data: cartData } = useSelector(
    (state) => state.cart.cartViewServices
  );
  const [cartList, setCartList] = useState(cartData?.details || []);
  const cart_id = localStorage.getItem("cart_id") || null;
  const breadcrumbs = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Cart",
    },
  ];

  const listCartApi = useCallback(async () => {
    try {
      const response = await dispatch(
        cartViewServices({
          cart_id,
        })
      ).unwrap();
      setCartList(response?.details);
      console.log("ggg");
    } catch (error) {
      setCartList([]);
    }
  }, []);

  const handleCheckout = async () => {
    setPopup(true);
  };

  const handlePayment = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    console.log("ggg");
    listCartApi();
  }, [cart_id]);
  return (
    <Wrapper>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <CardTitle>My Cart</CardTitle>
      <ProductList>
        {cartList?.map((product, index) => {
          return (
            <CartProductCard
              key={index}
              product={product}
              finishApi={listCartApi}
            />
          );
        })}
      </ProductList>
      <ButtonWrapper>
        {/* <Button variant='contained' onClick={handlePayment}>Check out</Button> */}
        {cart_id ? (
          <Button variant="contained" onClick={handleCheckout}>
            Check out
          </Button>
        ) : (
          <Button variant="contained" onClick={handlePayment}>
            Check out
          </Button>
        )}

        <Button variant="contained">Continue Shop</Button>
      </ButtonWrapper>
      {}
      <Dialog
        title="Please Login"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={popUp}
      >
        <DialogTitle id="alert-dialog-title">{"Please Login"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={(e) => {
            e.preventDefault();
            setPopup(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are not Logged In, Please Login!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const path = cart_id
                ? `/login?callBackUrl=/checkout&cart_id=${cart_id}`
                : "/login?callBackUrl=/checkout";
              navigate(path);
            }}
          >
            Login
          </Button>
          <Button
            // onClick={() => {
            //   setPopup(false);

            // }}
            onClick={handleClickOpen}
          >
            Guest Login
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Address</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <GuestLogin />
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled(StyledContainer)``;

const ProductList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px;
`;

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

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-block: 20px;
`;
