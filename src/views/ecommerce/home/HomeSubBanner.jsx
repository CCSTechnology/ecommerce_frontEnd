import { Box, Typography, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

export default function HomeSubBanner() {
    return (
        <HomeSubBannerWrapper>
            {/* <img src="/subbanner.jpg" alt="subbanner"/> */}
        </HomeSubBannerWrapper>
    )
}


const HomeSubBannerWrapper = styled(Box)`
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-block: 20px;
    background: url('/subbanner.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    img {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit : fit;
        z-index: -10;
    }

    svg {
    color: var(--Gray-Scale-White, #FFF);
    font-size: 50px;
    }

`

const Title = styled(Typography)`
    color: var(--Gray-Scale-White, #FFF);
text-align: center;

/* Heading 04/Heading 04 — 400 */
font-family: Poppins;
font-size: 36px;
font-style: normal;
font-weight: 600;
line-height: 120%; /* 43.2px */
`