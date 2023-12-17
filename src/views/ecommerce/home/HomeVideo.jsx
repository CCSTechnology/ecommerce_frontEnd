import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export default function HomeVideo() {
    const ref = useRef(null)
    const [play, setPlay] = useState(false)
    useEffect(() => {
        if (play) {
            ref.current.play()
        } else {
            ref.current.pause()
        }
    }, [play])
    return (
        <HomeVideoWrapper>
            <video autoplay muted loop id="myVideo" playsInline ref={ref}>
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <Title variant='h3' color={'white'}>
                We’re the Best Organic Farm in the World
            </Title>
            <IconButton onClick={() => {
                setPlay((state) => !state)
            }}>
                {
                    play ? <PauseCircleIcon /> : <PlayCircleIcon />
                }
            </IconButton>
        </HomeVideoWrapper>
    )
}


const HomeVideoWrapper = styled(Box)`
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-block: 20px;

    video {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit : cover;
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