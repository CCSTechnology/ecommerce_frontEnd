import React from "react"
import { Outlet } from 'react-router-dom'

const PlainLayout = () => {
    return (
        <div className="cg-wrapper">
            <Outlet />
        </div>
    );
};

export default PlainLayout;
