import React from "react";
import { Navbar } from "../../../components"; 
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid p-0" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="row g-0 h-100">
          
          <div className="col-md-6 d-none d-md-block h-100 position-relative">
            <img
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop"
              alt="Register Background"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
            <div className="col-10 col-lg-8 p-4">
              <div className="mb-4 text-center text-md-start">
                <h2 className="fw-bold display-6 mb-2" style={{ color: "#000" }}>
                  Get Started Now
                </h2>
                <p className="text-muted">Create your account to join our community</p>
              </div>
              
              <RegisterForm />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;