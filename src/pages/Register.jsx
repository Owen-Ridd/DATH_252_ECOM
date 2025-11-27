import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const Register = () => {
  const colors = {
    primary: "#3E5D46",
    bgInput: "#F5F5F5",
    textMuted: "#6c757d",
  };

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
              </div>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold small">Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg border-0"
                    placeholder="Enter your name"
                    style={{ backgroundColor: colors.bgInput, fontSize: "0.95rem" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg border-0"
                    placeholder="name@example.com"
                    style={{ backgroundColor: colors.bgInput, fontSize: "0.95rem" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg border-0"
                    placeholder="Enter your password"
                    style={{ backgroundColor: colors.bgInput, fontSize: "0.95rem" }}
                  />
                </div>
                <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" id="termsCheck" />
                  <label className="form-check-label small text-muted" htmlFor="termsCheck">
                    I agree to the terms & policy
                  </label>
                </div>
                <button
                  className="btn btn-lg w-100 text-white fw-bold mb-4"
                  type="submit"
                  style={{ backgroundColor: colors.primary, borderRadius: "8px" }}
                >
                  Signup
                </button>
                <div className="position-relative text-center mb-4">
                  <hr className="text-muted" />
                  <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
                    Or
                  </span>
                </div>
                <div className="d-flex gap-3 mb-4">
                  <button type="button" className="btn btn-light border flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="d-none d-sm-inline">Sign in with Google</span>
                    <span className="d-inline d-sm-none">Google</span>
                  </button>
                  <button type="button" className="btn btn-light border flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 4.31-.66c.58.03 2.2.47 2.94 1.51-2.4 1.4-2.01 4.19.34 5.39-.46 1.45-1.12 2.8-2.67 5.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.54 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="d-none d-sm-inline">Sign in with Apple</span>
                    <span className="d-inline d-sm-none">Apple</span>
                  </button>
                </div>
                <p className="text-center small">
                  Have an account?{" "}
                  <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "#0d6efd" }}>
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;