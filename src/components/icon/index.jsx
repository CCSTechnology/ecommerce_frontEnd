import { IconButton } from '@mui/material'
import React from 'react'

function IconComponent({ src }) {
    return (
        <IconButton sx={{
            background: '#e8a3d6'
        }}>
            <img src={src} />
        </IconButton>
    )
}

export default IconComponent