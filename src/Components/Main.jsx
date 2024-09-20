import React from "react";
import Footer from "./Footer";
import Bestseller from "./Bestseller";
import TopRated from "./TopRated";
import NewArrivals from "./NewArrivals";
import Trending from "./Trending";
import ProductDetail from "./ProductDetail";
import Header from "./Header";
// import Subnavbar from "./Subnavbar";
import Cart from "./Cart";
import MyOrders from "./Myorders";

import { User } from "lucide-react";

import SearchPage from "./SearchPage";

import FilteredProducts from "./FilterProducts";

const Main = () => {
  return (
    <>
      <Header />

      {/* <Subnavbar />{" "} */}

      <Bestseller />
      <Trending />
      <TopRated />

      <NewArrivals />
      <ProductDetail />
      {/* <MyOrders /> */}
      {/* <FilterPage /> */}

      <Footer />

      {/* <FilteredProducts /> */}
    </>
  );
};

export default Main;
