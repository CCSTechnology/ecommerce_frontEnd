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
          Plot no 17, Balan avenue, KTC Nagar, Tirunelveli, Tamil Nadu - 627011 India.
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