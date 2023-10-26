import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AdminHeader from "./utils/AdminHeader";
import { getSessionStorage, setSessionStorage } from "helpers/storage";
import SupervisorDashboard from "./utils/SupervisorSidebar";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [access, setAccess] = useState(true);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    useEffect(() => {
        role === "2" ? setAccess(true) : setAccess(false);
    }, []);
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        if (access === false) {
            navigate("/404");
        }
    }, [access, navigate]);
    return (
        <div className="cg-wrapper">
            {access && (
                <>
                    <SupervisorDashboard />
                    <section className="cg-content">
                        <AdminHeader />
                        <Box>
                            <Outlet />
                        </Box>
                    </section>
                </>
            )}
        </div>
    );
};

export default AdminLayout;
