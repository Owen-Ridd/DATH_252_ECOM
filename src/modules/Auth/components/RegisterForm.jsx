import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth"; 

const RegisterForm = () => {
  const { register, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const customGreen = "#3E5D46";
  const bgInput = "#F5F5F5";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-bold small">Name</label>
        <input
          type="text"
          className="form-control form-control-lg border-0"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={{ backgroundColor: bgInput, fontSize: "0.95rem" }}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold small">Email address</label>
        <input
          type="email"
          className="form-control form-control-lg border-0"
          id="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          style={{ backgroundColor: bgInput, fontSize: "0.95rem" }}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-bold small">Password</label>
        <input
          type="password"
          className="form-control form-control-lg border-0"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={{ backgroundColor: bgInput, fontSize: "0.95rem" }}
          required
        />
      </div>

      {/* Terms Checkbox */}
      <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" id="termsCheck" required />
        <label className="form-check-label small text-muted" htmlFor="termsCheck">
          I agree to the terms & policy
        </label>
      </div>

      {/* Submit Button */}
      <button
        className="btn btn-lg w-100 text-white fw-bold mb-4"
        type="submit"
        disabled={loading}
        style={{ backgroundColor: customGreen, borderRadius: "8px" }}
      >
        {loading ? "Creating Account..." : "Signup"}
      </button>

      {/* Divider */}
      <div className="position-relative text-center mb-4">
        <hr className="text-muted" />
        <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
          Or
        </span>
      </div>

      {/* Social Login Buttons */}
      <div className="d-flex gap-3 mb-4">
        <button type="button" className="btn btn-light border flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
           <FaGoogle className="text-danger" /> <span className="d-none d-sm-inline">Google</span>
        </button>
        <button type="button" className="btn btn-light border flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
           <FaApple /> <span className="d-none d-sm-inline">Apple</span>
        </button>
      </div>

      {/* Link to Login */}
      <p className="text-center small">
        Have an account?{" "}
        <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "#0d6efd" }}>
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;