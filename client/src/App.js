import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import Login from "./Component/Login/Login";
import SignUp from "./Component/SignUp/SignUp";
import DashBoard from "./Component/Dash/DashBoard";
import Home from "./Component/Home/Home";
import NavBar from "./Component/NavBar/NavBar";
import Cart from "./Component/Cart/Cart";
import Products from "./Component/Products/Products";
import "./App.css";
import SideBar from "./Component/Sidebar/Sidebar";
import FileUpload from "./Component/FileUpload/FileUpload";
import { ProductsProvider } from "./ProductContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "./Component/Invoice/Invoice";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <ToastContainer />
          <RenderNavBarConditionally />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/file" element={<FileUpload />} />

            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}

function RenderNavBarConditionally() {
  const location = useLocation();

  if (
    location.pathname !== "/home" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return (
      <>
        <NavBar />
        <SideBar />
      </>
    );
  }

  return null;
}

export default App;
