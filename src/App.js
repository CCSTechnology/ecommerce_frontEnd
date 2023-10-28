import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

//Auth
const Login = lazy(()=> import("./views/public/login"))
const Home = lazy(()=> import("./views/public/home"))

function App() {
  return (
    <>
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
      <Suspense fallback={'Loading'} >
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<AdminLayout />}>

          </Route>
        </Routes>

      </Suspense>

    </>
  );
}

export default App;
