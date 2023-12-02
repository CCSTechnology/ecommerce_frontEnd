import { Avatar, Badge, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { logo } from "../../helpers/images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartViewServices } from "../../redux/api/public/cartServices";
import { Logout, PersonAdd, } from "@mui/icons-material";
import { publicGetMe } from "../../redux/api/public/authService";

export default function Header() {
  const { data } = useSelector((state) => state.cart.cartViewServices)
  const user = useSelector((state)=>state.publicAuth.publicGetMe.data)
  const navigate = useNavigate()
  const [cartData, setCartData] = useState(data)
  const [userData, setUserData] = useState(user)
  const cartAmount = cartData?.grand_total || 0
  const cartProductLength = cartData?.details.length || 0
  const dispatch = useDispatch()
  const cartId = localStorage.getItem("cart_id") || null
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  async function fetchCart(cart_id) {
    try {
      const response = await dispatch(cartViewServices({
        cart_id
      })).unwrap()
      setCartData(response)
    } catch (error) {
      setCartData(null)
    }
  }

  async function fetchUser(cart_id) {
    try {
      const response = await dispatch(publicGetMe()).unwrap()
      setUserData(response)
    } catch (error) {
      setUserData(null)
    }
  }

  function handleLogout(e) {
    e.preventDefault()
    try {
      localStorage.removeItem("public_token")
      navigate('/login')
      handleClose()
      fetchCart()
    } catch (error) {
      fetchCart()
      console.log(error, "ee")
    }

  }

  useEffect(() => {
    fetchCart(cartId)
  }, [cartId])

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (data  !== null) {
      setCartData(data)
    }
  }, [data])

  useEffect(() => {
    if (user  !== null) {
      setUserData(user)
    }
  }, [user])

  

  return (
    <NavbarWrapper to='/cart'>
      <LogoContainer to="/">
        <Logo loading="lazy" src={logo} />
      </LogoContainer>
      <SearchContainer>
        <SearchIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a878d6b6-f3e2-4273-8d96-7792848ff1af?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
        <SearchText>Search</SearchText>
      </SearchContainer>
      <CartContainer>
        <Badge badgeContent={cartProductLength} color="primary">
          <CartIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3dacf0af-d9ab-4feb-9173-044d05adfe1e?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
        </Badge>
        {/* <Divider /> */}
        <CartInfo>
          <CartTitle>Shopping cart:</CartTitle>
          <CartPrice>₹ {Number(cartAmount).toFixed(2)}</CartPrice>
        </CartInfo>
        {
          user && <ProfileContainer>
          <Tooltip title="Account" onClick={(e)=>e.preventDefault()}> 
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{String(userData?.first_name[0]).toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar />&nbsp; Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              My orders
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </ProfileContainer>
        }
        
      </CartContainer>

    </NavbarWrapper>
  );
}

const NavbarWrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  cursor: pointer;

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

const Logo = styled('img')`
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
  margin: auto 0;
`;

const SearchIcon = styled('img')`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
  overflow: hidden;
  max-width: 100%;
`;

const SearchText = styled('p')`
  color: var(--gray-scale-gray-500, #808080);
  font: 400 15px/21px Poppins, sans-serif;
`;

const CartContainer = styled(Box)`
  align-items: center;
  border-radius: 6px;
  border: 1px solid var(--gray-scale-gray-100, #e6e6e6);
  display: flex;
  padding: 0 16px ;
  justify-content: space-between;
  gap: 0px;
  height: 100%;
  /* height: 40px; */

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;


const ProfileContainer = styled(Box)`

`

const CartIcon = styled('img')`
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
  padding: 16px ;
  justify-content: space-between;
  gap: 12px;
`;

const CartTitle = styled('p')`
  color: var(--gray-scale-gray-700, #4d4d4d);
  white-space: nowrap;
  font: 400 11px/13px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const CartPrice = styled('p')`
  color: var(--gray-scale-gray-900, #1a1a1a);
  white-space: nowrap;
  font: 500 14px/14px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

