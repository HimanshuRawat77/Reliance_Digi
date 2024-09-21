import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Signin from "./Components/ Signin";
import Signup from "./Components/Signup";
import Bestseller from "./Components/Bestseller";
import Main from "./Components/Main";
import ProductDetail from "./Components/ProductDetail";
import Checkout from "./Components/checkout";
import UserProfile from "./Components/UserProfile";
import Payment from "./Components/Payment";
import SearchPage from "./Components/SearchPage";

import Products from "./Components/Products";

import Cart from "./Components/Cart";

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Signin />} />{" "}
          {/* Consistent with import */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Remove the duplicate with incorrect capitalization */}
          <Route path="/Signin" element={<Signin />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search" element={<Products />} />
          {/* <Route path="/search" element={<FilterPage />} /> */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
