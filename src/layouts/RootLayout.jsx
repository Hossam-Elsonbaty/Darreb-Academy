import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";

const RootLayout = () => {
  return (
    <main className=" bg-[#eefbf3]">
      <Navbar />
      <Outlet />
      <Footer/>
    </main>
  );
};

export default RootLayout;
