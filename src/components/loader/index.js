import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { Loader } from "../../helpers/images";

function Loadercomponent({ isFetching }) {
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

export default Loadercomponent