import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";
import { FaGoogle, FaApple } from "react-icons/fa";

const Login = () => {
  const customGreen = "#3a5a40";

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0 overflow-hidden" style={{ height: "100vh" }}>
        <div className="row h-100 g-0">
          <div className="col-md-6 d-none d-md-block h-100 position-relative">
            <img
              src="https://images.unsplash.com/photo-1560185009-dddeb820c7b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
              alt="Login Background"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
            <div className="col-10 col-lg-8 p-4 p-md-5">
              <div className="mb-5 text-center text-md-start">
                <h2 className="fw-bold fs-1 mb-2" style={{ color: customGreen }}>
                  Welcome back!
                </h2>
                <p className="text-muted">
                  Enter your Credentials to access your account
                </p>
              </div>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg fs-6"
                    id="email"
                    placeholder="name@example.com"
                    style={{ backgroundColor: "#f0f2f5", borderColor: "#e4e6eb" }}
                  />
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <label htmlFor="password" class="form-label fw-semibold mb-0">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none fs-6"
                      style={{ color: customGreen }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-lg fs-6 mt-2"
                    id="password"
                    placeholder="Password"
                    style={{ backgroundColor: "#f0f2f5", borderColor: "#e4e6eb" }}
                  />
                </div>
                <button
                  className="btn btn-lg w-100 text-white fw-bold fs-6"
                  type="submit"
                  style={{ backgroundColor: customGreen, borderColor: customGreen }}
                >
                  Login
                </button>
                <div className="my-4 text-center text-muted position-relative">
                  <hr className="m-0" />
                  <span className="px-3 bg-light position-absolute top-50 start-50 translate-middle fs-6">
                    Or continue with
                  </span>
                </div>
                <div className="d-flex gap-3 mb-4">
                  <button
                    type="button"
                    className="btn btn-light btn-lg w-100 border d-flex align-items-center justify-content-center fs-6"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <FaGoogle className="me-2 text-danger" /> Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-lg w-100 border d-flex align-items-center justify-content-center fs-6"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <FaApple className="me-2" /> Apple
                  </button>
                </div>
                <p className="text-center text-muted">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none fw-bold"
                    style={{ color: customGreen }}
                  >
                    Sign up
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

export default Login;