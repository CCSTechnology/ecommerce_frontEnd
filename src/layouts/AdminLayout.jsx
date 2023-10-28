/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AdminHeader from "./utils/AdminHeader";
import AdminSidebar from "./utils/AdminSidebar";

const AdminLayout = () => {
	const navigate = useNavigate();
	// const [access, setAccess] = useState(true);

	// const token = localStorage.getItem("token");
	
	// useEffect(() => {
	// 	if (!token) {
	// 		navigate("/");
	// 	}
	// 	// if (access === false) {
	// 	// 	navigate("/404");
	// 	// }
	// }, [ navigate]);
	return (
		<div className="cg-wrapper">
		
				<>
					<AdminSidebar />
					<section className="cg-content">
						<AdminHeader />
						<Box>
							<Outlet />
						</Box>
					</section>
				</>
			
		</div>
	);
};

export default AdminLayout;
