import React, { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import withErrorBoundary from "./hoc/withErrorBoundary";
import AdminLayout from "views/layouts/AdminLayout";
import SupervisorLayout from "views/layouts/SupervisorLayout";
import PlainLayout from "views/layouts/PlainLayout";
import UnAuthed from "views/pages/404";
import Toast from "components/Snackbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadercomponent from "components/loader";
// import { onMessageListener } from "./firebase";
import { useDispatch } from "react-redux";
import { notificationList } from "redux/api/services/notificationService";
import { authEndPoints } from "helpers/endpoints";
import { Category } from "@mui/icons-material";

const Login = lazy(() => import("views/pages/auth/login"));
const EmailVerify = lazy(() => import("views/pages/email-verify"));
const Registration = lazy(() => import("views/pages/auth/registration"));
const ForgotPassword = lazy(() => import("views/pages/auth/forgot-password"));
const ResetPassword = lazy(() => import("views/pages/auth/reset-password"));
const ChangePassword = lazy(() => import("views/pages/profile/changePassword"));
const MyProfile = lazy(() => import("views/pages/profile/myProfile"));
const EditProfile = lazy(() => import("views/pages/profile/editProfile"));

const Dashboard = lazy(() => import("views/pages/dashboard"));
const CategoryList = lazy(() => import("views/pages/category/list"));
const CategoryView = lazy(() => import("views/pages/category/categoryView"));
const Jobs = lazy(() => import("views/pages/jobs"));
const Employees = lazy(() => import("views/pages/employees/list"));
const EmployeeView = lazy(() => import("views/pages/employees/employeeView"));
const Products = lazy(() => import("views/pages/products/list"));
const ProductView = lazy(() => import("views/pages/products/productView"));
const Roles = lazy(() => import("views/pages/roles/list"));
const RoleAndPermission = lazy(() => import("views/pages/roles/roleandPermission"));
const Chats = lazy(() => import("views/pages/chats"));
const Notifications = lazy(() => import("views/pages/notifications"));
const Tasks = lazy(() => import("views/pages/tasks"));
const TaskViewForm = lazy(() => import("views/pages/tasks/taskviewForm"));
const FormList = lazy(() => import("views/pages/forms/list"));
const AddEditForm = lazy(() => import("views/pages/forms/AddEditForm"));
const InvoiceList = lazy(() => import("views/pages/invoice"));
const InvoiceView = lazy(() => import("views/pages/invoice/view"));

const NotFound = lazy(() => import("views/pages/not-found"));

function App() {
	const dispatch = useDispatch();
	const [toastOpen, setToastOpen] = useState({
		open: false,
		message: null,
	});
	const fecthNotification = async () => {
		try {
			const parameters = {
				url: `${authEndPoints.notification.list}`,
			};
			await dispatch(notificationList(parameters)).unwrap();
		} catch (err) {
			console.log(err, "err");
		}
	};
	// onMessageListener()
	// 	.then(async (payload) => {
	// 		fecthNotification();
	// 		setToastOpen({
	// 			open: true,
	// 			message: payload.notification.body,
	// 		});
	// 	})
	// 	.catch((err) => console.log("failed: ", err));
	return (
		<>
			{toastOpen.open && (
				<Toast
					open={toastOpen.open}
					handleClick={() =>
						setToastOpen((prev) => ({
							message: null,
							open: !prev.open,
						}))
					}
					message={toastOpen.message}
				/>
			)}

			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Suspense fallback={<Loadercomponent isFetching={true} />}>
				<Routes>
					<Route element={<PlainLayout />}>
						<Route path="/" element={<Login />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/registration" element={<Registration />}></Route>
						<Route path="/forgot-password" element={<ForgotPassword />}></Route>
						<Route path="/reset-password" element={<ResetPassword />}></Route>
						<Route path="/email-verify" element={<EmailVerify />}></Route>
					</Route>
					<Route element={<AdminLayout />}>
						<Route path="/dashboard" element={<Dashboard />}></Route>
						{/* <Route path="admin" element={<Dashboard />}></Route> */}
						{/* <Route path="admin/dashboard" element={<Dashboard />}></Route> */}
						<Route path="/category" element={<CategoryList />}></Route>
						<Route path="/category/:id" element={<CategoryView />}></Route>
						<Route path="admin/jobs" element={<Jobs />}></Route>
						<Route path="/employees" element={<Employees />}></Route>
						<Route path="admin/employees/:id" element={<EmployeeView />}></Route>
						<Route path="/products" element={<Products />}></Route>
						<Route path="/products/:id" element={<ProductView/>}></Route>
						<Route path="admin/roles" element={<Roles />}></Route>
						<Route path="admin/roleandPermission/:id" element={<RoleAndPermission />}></Route>
						<Route path="admin/chats" element={<Chats />}></Route>
						<Route path="admin/forms" element={<FormList />}></Route>
						<Route path="admin/forms/add" element={<AddEditForm />}></Route>
						<Route path="admin/forms/edit/:id" element={<AddEditForm />}></Route>
						<Route path="admin/notifications" element={<Notifications />}></Route>
						<Route path="admin/tasks" element={<Tasks />}></Route>
						<Route path="admin/tasks/:id" element={<TaskViewForm />}></Route>
						<Route path="admin/changePassword" element={<ChangePassword />} />
						<Route path="admin/myProfile" element={<MyProfile />} />
						<Route path="admin/editProfile" element={<EditProfile />} />
						<Route path="admin/invoice" element={<InvoiceList />} />
						<Route path="admin/invoiceView/:id" element={<InvoiceView />} />
					</Route>
					<Route element={<SupervisorLayout />}>
						<Route path="supervisor" element={<Dashboard />}></Route>
						<Route path="supervisor/dashboard" element={<Dashboard />}></Route>
						<Route path="supervisor/jobs" element={<Jobs />}></Route>
						<Route path="supervisor/tasks" element={<Tasks />}></Route>
						<Route path="supervisor/tasks/:id" element={<TaskViewForm />}></Route>
						<Route path="supervisor/notifications" element={<Notifications />}></Route>
						<Route path="supervisor/changePassword" element={<ChangePassword />} />
						<Route path="supervisor/myProfile" element={<MyProfile />} />
						<Route path="supervisor/editProfile" element={<EditProfile />} />
					</Route>
					<Route path="*" element={<NotFound />} />
					<Route path="/404" element={<UnAuthed />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default withErrorBoundary(App);
