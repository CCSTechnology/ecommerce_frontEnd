import React from "react";
import { Typography, styled, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";


const menuList = [
  {
    label: "Home",
    link: '/'
  },
  {
    label: "Shop",
    link: '/category/all'
  },
  {
    label: "Contact Us",
    link: '/contact-us'
  },
  {
    label: "About Us",
    link: '/'
  },
]

const NavigationBar = () => {
  return (
    <NavbarWrapper>
      <MenuContainer>
        {
          menuList.map((menu) => (<MenuItem key={menu.label}>
            <Link to={menu.link}>{menu.label}</Link>
          </MenuItem>))
        }
      </MenuContainer>
      <ContactContainer>
        <ContactIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/957d9cfb-7acb-407a-8f18-8586efde1b85?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
          alt="Contact Icon"
        />
        <ContactInfo>(+91) 93211 88645</ContactInfo>
      </ContactContainer>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px"
}))



const MenuContainer = styled(Box)`
  display: flex;
  gap: 20px;
  margin: auto 0;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const MenuItem = styled(Box)`
  color: var(--gray-scale-gray-400, #999);
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  gap: 5px;
  cursor: pointer;
  align-items: center;
  font-family: Poppins, sans-serif;
  a {
    color: var(--gray-scale-white, #fff);
  }
  :hover {
    a {
      color: #00B207;
    }
  }
`;


const ContactContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-scale-white, #fff);
  :hover {
    color: var(--gray-scale-white, #00B207);

  }
  cursor: pointer;
`;

const ContactIcon = styled(PhoneIcon)`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 28px;
  max-width: 100%;
  
  `;

const ContactInfo = styled(Typography)`
  flex-grow: 1;
  white-space: nowrap;
  margin: auto 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  font-family: Poppins, sans-serif;

  

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

export default NavigationBar;

// import { styled } from '@mui/material'
// import React from 'react'
// import { ArrowDownImage, PhoneCallImage } from '../../utils/image'
// import { Link } from 'react-router-dom'

// const menusList = [{
//     name: "Home",
//     child: [],
//     link: "/",
// },
// {
//     name: "Home",
//     child: [],
//     link: "/",
// },
// {
//     name: "Home",
//     child: [],
//     link: "/",
// }, {
//     name: "Home",
//     child: [],
//     link: "/",
// }, {
//     name: "Home",
//     child: [],
//     link: "/",
// }]

// const Navbar = () => {
//     return (
//         <NavbarContainer>
//             <StyledWrapper>
//                 {
//                     menusList.map((menu, index) => {
//                         const { name, link } = menu
//                         return <StyledMenu key={index}>
//                             <StyledMenuItem to="/">{name}</StyledMenuItem>
//                             <StyledMenuImg src={ArrowDownImage} />
//                         </StyledMenu>

//                     })
//                 }
//             </StyledWrapper>
//             <PhoneWraper>
//                 <StyledMenuImg src={PhoneCallImage} />
//                 <PhoneNumber>(219) 555-0114</PhoneNumber>
//             </PhoneWraper>
//         </NavbarContainer>
//     )
// }

// export default Navbar


// const NavbarContainer = styled('div')`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 35px;
//     background-color: rgba(51, 51, 51, 1);
//     padding-inline: 20px;
// `
// const PhoneWraper = styled('div')`
//     display: flex;
//     align-items: center;
//     gap: 4px;  
// `

// const StyledWrapper = styled('div')`
//     display: flex;
//     align-items: center;
//     gap: 32px;  

// `
// const StyledMenuImg = styled("img")`

// `

// const StyledMenu = styled(Box)`
//     display: flex;
//     align-items: center;
//     gap: 4px; 
// `

// const StyledMenuItem = styled(Link)`
//     color: rgba(255, 255, 255, 1);
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 150%;
//     text-decoration: none;
// `


// const PhoneNumber = styled('p')`
//     color: rgba(255, 255, 255, 1);
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 150%; /* 21px */
// `

