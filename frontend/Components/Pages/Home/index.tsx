import CartComponent from "@/Components/Cart";
import Dashboard from "@/Components/Dashboard";
import HeaderComponent from "@/Components/Header";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="max-w-[90vw] mx-auto">
        <HeaderComponent />
        <CartComponent />
        <Dashboard />
      </div>
    </>
  );
};

export default HomePage;
