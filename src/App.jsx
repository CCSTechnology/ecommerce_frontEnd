import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import AdminLayout from "./layouts/AdminLayout";
import PlainLayout from "./layouts/PlainLayout";
import LoaderComponent from "./components/loader";
import PublicLayout from "./layouts/PublicLayout";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Check } from "@mui/icons-material";

//Public
// const Login = lazy(() => import("./views/public/login"));
// const Home = lazy(() => import("./views/public/home"));
// const Category = lazy(() => import("./views/public/category"));
// const Product = lazy(() => import("./views/public/product"));
const SuccessPage = lazy(() => import("./views/public/payment-success"));
const ErrorPage = lazy(() => import("./views/public/payment-fail"));
const EmailVerify = lazy(() => import("./views/public/email-verifysuccess"));
const EmailVerifyFaliure = lazy(() =>
  import("./views/public/email-verifyfail")
);
const ContactUs = lazy(() => import("./views/public/contact-us"));
const AboutUs = lazy(() => import("./views/public/about-us"));
const UserProfile = lazy(() => import("./views/public/user-profile"));
//Admin
const AdminLogin = lazy(() => import("./views/admin/login"));
const AdminDashboard = lazy(() => import("./views/admin/dashboard"));
const CategoryList = lazy(() => import("./views/admin/category/list"));
const CategoryView = lazy(() => import("./views/admin/category/categoryView"));
const ProductList = lazy(() => import("./views/admin/products/list"));
const ProductView = lazy(() => import("./views/admin/products/productView"));
const CustomerList = lazy(() => import("./views/admin/customers/list"));
const CustomerView = lazy(() => import("./views/admin/customers/customerView"));
const Settings = lazy(() => import("./views/admin/settings"));
const OrderList = lazy(() => import("./views/admin/orders/list"));
const Promotions = lazy(() => import("./views/admin/promotions/list"));
const PromotionsView = lazy(() =>
  import("./views/admin/promotions/promotionView")
);

//Ecommerce
const Login = lazy(() => import("./views/ecommerce/auth/login"));
const SignUp = lazy(() => import("./views/ecommerce/auth/sign-up"));

const Home = lazy(() => import("./views/ecommerce/home"));
const Products = lazy(() => import("./views/ecommerce/products"));
const ChangePassword = lazy(() => import("./views/ecommerce/change-password"));
const MyOrders = lazy(() => import("./views/ecommerce/myorders"));
const Product = lazy(() => import("./views/ecommerce/product"));
const Cart = lazy(() => import("./views/ecommerce/cart"));
const GuestCheckOut = lazy(() =>
  import("./views/ecommerce/auth/getLoginCheckout")
);

const CheckOut = lazy(() => import("./views/ecommerce/checkout"));

function App() {
  return (
    <BrowserRouter>
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
      <Suspense fallback={<LoaderComponent isFetching={true} />}>
        <Routes>
          <Route path="/guest-login" element={<GuestCheckOut />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/category/:categorySlug"
              element={<Products />}
            ></Route>
            <Route path="/product/:productSlug" element={<Product />}></Route>
            <Route path="/cart" element={<Cart />}></Route>

            <Route path="/checkout" element={<CheckOut />}></Route>
            <Route path="/contact-us" element={<ContactUs />}></Route>
            <Route path="/about-us" element={<AboutUs />}></Route>
            <Route path="/user-profile" element={<UserProfile />}></Route>
            <Route path="/user/myorders" element={<MyOrders />}></Route>
            <Route
              path="/user/change-password"
              element={<ChangePassword />}
            ></Route>
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="admin/dashboard" element={<AdminDashboard />}></Route>
            <Route path="admin/category" element={<CategoryList />}></Route>
            <Route path="admin/category/:id" element={<CategoryView />}></Route>
            <Route path="admin/products" element={<ProductList />}></Route>
            <Route path="admin/products/:id" element={<ProductView />}></Route>
            <Route path="admin/customers" element={<CustomerList />}></Route>
            <Route path="admin/orders" element={<OrderList />}></Route>
            <Route path="admin/promotions" element={<Promotions />}></Route>
            <Route
              path="admin/promotions/:id"
              element={<PromotionsView />}
            ></Route>
            <Route
              path="admin/customers/:id"
              element={<CustomerView />}
            ></Route>
            <Route path="admin/settings" element={<Settings />}></Route>
          </Route>
          <Route element={<PlainLayout />}>
            <Route path="admin" element={<AdminLogin />}></Route>
            <Route path="admin/login" element={<AdminLogin />}></Route>
            <Route path="/payment-success" element={<SuccessPage />}></Route>
            <Route path="/payment-fail" element={<ErrorPage />}></Route>
            <Route
              path="/email-verifysuccess"
              element={<EmailVerify />}
            ></Route>
            <Route
              path="/email-verifyfail"
              element={<EmailVerifyFaliure />}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
