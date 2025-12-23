import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import CartModal from "../components/Modal";
import Chatbot from "../components/Chatbot";

const RootLayout = () => {
  return (
    <main className=" bg-[#eefbf3]">
      <Navbar />
      <Outlet />
      <CartModal />
      <Footer/>
      <Chatbot/>
    </main>
  );
};

export default RootLayout;
