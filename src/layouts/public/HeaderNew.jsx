import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { logo } from "../../helpers/images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartViewServices } from "../../redux/api/public/cartServices";
import { Logout } from "@mui/icons-material";
import { publicGetMe } from "../../redux/api/public/authService";
import Asynchronous from "./AutoComplete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import KeyIcon from "@mui/icons-material/Key";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
export default function HeaderNew() {
  const { data } = useSelector((state) => state.cart.cartViewServices);
  const user = useSelector((state) => state.publicAuth.publicGetMe.data);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(data);
  const [userData, setUserData] = useState(user);
  const cartAmount = cartData?.grand_total || 0;
  const cartProductLength = cartData?.details?.length || 0;
  const dispatch = useDispatch();
  const cart_id = localStorage.getItem("cart_id") || null;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  async function fetchCart() {
    try {
      const response = await dispatch(
        cartViewServices({
          cart_id,
        })
      ).unwrap();
      setCartData(response);
    } catch (error) {
      setCartData(null);
    }
  }

  async function fetchUser(cart_id) {
    try {
      const response = await dispatch(publicGetMe()).unwrap();
      setUserData(response);
    } catch (error) {
      setUserData(null);
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    try {
      localStorage.removeItem("public_token");
      navigate("/login");
      handleClose(e);
      fetchCart();
    } catch (error) {
      fetchCart();
      console.log(error, "ee");
    }
  }

  useEffect(() => {
    console.log("ggg");
    fetchCart();
  }, [cart_id]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (data !== null) {
      setCartData(data);
    }
  }, [data]);

  useEffect(() => {
    if (user !== null) {
      setUserData(user);
    }
  }, [user]);
  return (
    <NavbarWrapper>
      <LogoContainer to="/">
        <Logo loading="lazy" src={logo} />
      </LogoContainer>
      <SearchContainer>
        <Asynchronous />
        {/* <SearchIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a878d6b6-f3e2-4273-8d96-7792848ff1af?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
        <SearchText>Searchhttp://localhost:5173/cart</SearchText> */}
      </SearchContainer>
      <Box className="header-new-link">About Us</Box>
      <Box>Products</Box>
      <Box>Limited TimeDeals</Box>
      <Box>Contact Us</Box>
      <Box
        sx={{
          background: "#951E76",
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "Montserrat",
          width: "130px",
          height: "22px",
          borderRadius: "18px",
          color: "white",
          padding: "10px",
          //   position: "relative",
        }}
      >
        <Link
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <LocalPhoneIcon />
          <Typography>93211 88645</Typography>
        </Link>
      </Box>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  cursor: pointer;
  background-color: #ffff;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const LogoContainer = styled(Link)`
  align-items: center;
  align-self: center;
  display: flex;
  gap: 8px;
  margin: auto 0;
`;

const Logo = styled("img")`
  object-fit: contain;
  object-position: center;
  width: 118px;
  overflow: hidden;
  max-width: 100%;
  margin: auto 0;
  padding: 4px;
`;

const SearchContainer = styled(Box)`
  display: flex;
  gap: 8px;
  width: 35%;

  justify-content: center;
`;

const SearchIcon = styled("img")`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
  overflow: hidden;
  max-width: 100%;
`;

const SearchText = styled("p")`
  color: var(--gray-scale-gray-500, #808080);
  font: 400 15px/21px Poppins, sans-serif;
`;

const CartContainer = styled(Box)`
  align-items: center;
  border-radius: 6px;
  border: 1px solid var(--gray-scale-gray-100, #e6e6e6);
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  gap: 0px;
  height: 100%;
  margin-right: 10px;
  /* height: 40px; */

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  @media (max-width: 400px) {
    padding: 0 0px;
  }
`;

const ProfileContainer = styled(Box)``;

const CartIcon = styled("img")`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  overflow: hidden;
  align-self: stretch;
  max-width: 100%;
`;

const Divider = styled(Box)`
  background-color: #ccc;
  width: 1px;
  height: 24px;
  margin: auto 0;
`;

const CartInfo = styled(Box)`
  align-items: center;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  gap: 12px;
`;

const CartTitle = styled("p")`
  color: var(--gray-scale-gray-700, #4d4d4d);
  white-space: nowrap;
  font: 400 11px/13px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const CartPrice = styled("p")`
  color: var(--gray-scale-gray-900, #1a1a1a);
  white-space: nowrap;
  font: 500 14px/14px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;
