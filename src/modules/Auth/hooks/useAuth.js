import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosClient from "../../../api/axiosClient";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      
      const { token, ...userInfo } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfo));
      
      toast.success(`Welcome back, ${userInfo.name}!`);
      
     
      return userInfo; 

    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return null; 
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      await axiosClient.post("/auth/register", userData);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return { loading, login, register, logout };
};