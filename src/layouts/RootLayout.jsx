import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className=" container bg-lightGreen">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
