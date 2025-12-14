import React from "react";
import { Outlet } from "react-router-dom"; 
import { Navbar, Footer } from "../components"; 

const MainLayout = () => {
  return (
    <>
      <Navbar />
      
      <div style={{ minHeight: "100vh", backgroundColor: "#FFFCFC", marginTop: "80px" }}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;