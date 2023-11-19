import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { Loader } from "../../helpers/images";

export default function LoaderComponent({ isFetching }) {
    return (
        <Backdrop
            open={isFetching}
            sx={{
                zIndex: 70000,
                position: 'absolute',
                background: 'transparent'
            }}
        >
            <img src={Loader} alt='loadder' />
        </Backdrop>
    )
}