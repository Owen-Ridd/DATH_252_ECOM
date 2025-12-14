import React from "react";
import { Navbar } from "../../../components"; 
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const customGreen = "#3a5a40";

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0 overflow-hidden" style={{ height: "100vh" }}>
        <div className="row h-100 g-0">
          <div className="col-md-6 d-none d-md-block h-100 position-relative">
            <img
              src="https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=80&w=1965&auto=format&fit=crop"
              alt="Login Background"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
            <div className="col-10 col-lg-8 p-4 p-md-5">
              <div className="mb-5">
                <h2 className="fw-bold fs-1 mb-2" style={{ color: customGreen }}>Welcome back!</h2>
                <p className="text-muted">Enter your Credentials to access your account</p>
              </div>
              
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;