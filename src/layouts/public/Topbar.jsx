// import { Container, Typography, styled } from '@mui/material'
// import React from 'react'

// const Topbar = ({ content = "Store Location: Lincoln- 344, Illinois, Chicago, USA" }) => {
//     return (
//         <TopbarContainer>
//             <StyledContent component={'p'}  sx={{
//                 textAlign: { xs: 'center', md: "start" }
//             }}>{content}</StyledContent>
//             <StyledContent component={'p'} sx={{
//                 textAlign: { xs: 'center', md: "start" }
//             }}>{content}</StyledContent>
//         </TopbarContainer>
//     )
// }

// export default Topbar

// const TopbarContainer = styled('div')`
//     min-height: 40px;
//     display: flex;
//     padding-inline: 20px;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     align-items: center;
// `

// const StyledContent = styled('p')`
//     color: rgba(102, 102, 102, 1);
//     font-family: Poppins;
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 130%;
// `

import React from "react";
import { styled } from "@mui/material";
import { Box, Typography, Divider } from "@mui/material";

export default function TopBar() {
    return (
        <TopBarWrapper>
            <LogoContainer>
                <StoreLogo
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f8dddfc-8f66-4be6-9891-231ccd54f6ea?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
                />
                <StoreLocation>
                    Store Location: Lincoln- 344, Illinois, Chicago, USA
                </StoreLocation>
            </LogoContainer>
        </TopBarWrapper>

    );
}


const TopBarWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;

`

const LogoContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  margin: 12px 0;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const StoreLocation = styled(Typography)`
  color: var(--gray-scale-gray-600, #666);
  flex-grow: 1;
  white-space: nowrap;
  font: 400 12px/16px Poppins, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StoreLogo = styled("img")`
  aspect-ratio: 0.83;
  object-fit: contain;
  object-position: center;
  width: 15px;
  overflow: hidden;
  max-width: 100%;
`;