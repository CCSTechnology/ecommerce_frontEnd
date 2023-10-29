import { Container } from '@mui/material'
import React from 'react'

const Topbar = ({ content = "Topbar" }) => {
    return (
        <Container maxWidth={'xl'} sx={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            background: "#222",
            color: "#fff",
            whiteSpace : "nowrap",
            overflow : "hidden",
            fontSize: { xs: '6px', md: '12px' },
            
        }}>{content}</Container>
    )
}

export default Topbar