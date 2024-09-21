import React from "react";
import Footer from "./Footer";
import Bestseller from "./Bestseller";
import TopRated from "./TopRated";
import NewArrivals from "./NewArrivals";
import Trending from "./Trending";
import ProductDetail from "./ProductDetail";
import Header from "./Header";

import Cart from "./Cart";
import MyOrders from "./Myorders";

import { User } from "lucide-react";

import SearchPage from "./SearchPage";

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
      {/* <PriceFilter /> */}
      {/* <CategoryFilter />
      <CombineFilter /> */}
      <Cart />

      <Footer />
    </>
  );
};

export default Main;
