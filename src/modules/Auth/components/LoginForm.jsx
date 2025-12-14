import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaGoogle, FaApple } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth"; 

const LoginForm = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate(); 
  const customGreen = "#3a5a40";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => { 
    e.preventDefault();
    try {
      
      const userData = await login(email, password);

      if (userData) {
        if (userData.role === 'admin') {
          navigate("/admin"); 
        } else {
          navigate("/");      
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Email address</label>
        <input 
          type="email" 
          className="form-control form-control-lg fs-6" 
          placeholder="name@example.com" 
          style={{ backgroundColor: "#f0f2f5" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          <label className="form-label fw-semibold mb-0">Password</label>
          <Link to="/forgot-password" className="text-decoration-none fs-6" style={{ color: customGreen }}>Forgot Password?</Link>
        </div>
        <input 
          type="password" 
          className="form-control form-control-lg fs-6 mt-2" 
          placeholder="Password" 
          style={{ backgroundColor: "#f0f2f5" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button className="btn btn-lg w-100 text-white fw-bold fs-6" type="submit" disabled={loading} style={{ backgroundColor: customGreen }}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="d-flex gap-3 my-4">
        <button type="button" className="btn btn-light w-100 border"><FaGoogle className="text-danger me-2"/> Google</button>
        <button type="button" className="btn btn-light w-100 border"><FaApple className="me-2"/> Apple</button>
      </div>

      <p className="text-center text-muted">
        Don't have an account? <Link to="/register" className="fw-bold" style={{ color: customGreen }}>Sign up</Link>
      </p>
    </form>
  );
};

export default LoginForm;