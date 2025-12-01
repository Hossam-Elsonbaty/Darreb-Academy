import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="bg-lightGreen container px-2 xl:px-10 mx-auto">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
