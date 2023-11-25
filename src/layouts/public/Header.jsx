import { Box, styled } from "@mui/material";
import React from "react";
import { logo } from "../../helpers/images";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <NavbarWrapper>
      <LogoContainer to="/">
        <Logo loading="lazy" src={logo} />
      </LogoContainer>
      <SearchContainer>
        <SearchIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a878d6b6-f3e2-4273-8d96-7792848ff1af?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
        <SearchText>Search</SearchText>
      </SearchContainer>
      <CartContainer>
        <CartIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3dacf0af-d9ab-4feb-9173-044d05adfe1e?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
        <Divider />
        <CartInfo>
          <CartTitle>Shopping cart:</CartTitle>
          <CartPrice>₹ 57.00</CartPrice>
        </CartInfo>
      </CartContainer>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;

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
  height: 80px;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

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

export default Navbar;



// import { Badge, Button, Container, styled } from '@mui/material'
// import React from 'react'
// import MailIcon from '@mui/icons-material/Mail';

// const Header = () => {
//   return (
//       <HeaderWraper>
//         <Logo>Logo</Logo>
//         <SearchBar >
//           <input></input>
//           <SearchButton variant='contained'>Search</SearchButton>
//         </SearchBar>
//         <Profile>
//           <Badge badgeContent={4} color="primary">
//             <MailIcon color="action" />
//           </Badge>
//         </Profile>
//       </HeaderWraper>
//   )
// }

// export default Header

// const HeaderWraper = styled('div')`
// display: flex;
// align-items: center;
// justify-content: space-between;
// height: 40px;
// padding-inline: 20px;
// `

// const Logo = styled('p')``
// const SearchBar = styled('div')`
// display: flex;
// `

// const SearchButton = styled(Button)`
// display: flex;
// align-items: center;
// color: white;
// `

// const Profile = styled('div')``
