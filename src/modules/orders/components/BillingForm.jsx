import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../hooks/useCart";
import { clearCart } from "../store/cartSlice"; // Cần tạo action này nếu chưa có
import axiosClient from "../../../api/axiosClient";

const BillingForm = () => {
  const { cartItems, totalAmount } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "Ho Chi Minh"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
        city: formData.city
      },
      items: cartItems.map(item => ({
        product_title: item.title,
        price: item.price,
        qty: item.qty,
        image: item.image
      })),
      totalAmount: totalAmount,
      status: "Pending"
    };

    try {
      await axiosClient.post("/orders", orderData);
      
      toast.success("Order Placed Successfully! 🎉");
      
      dispatch(clearCart());
      
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header py-3">
        <h4 className="mb-0">Billing address</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" required onChange={handleChange} />
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" required onChange={handleChange} />
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required onChange={handleChange} />
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" required onChange={handleChange} />
            </div>
            
            <div className="col-12">
               <label htmlFor="city" className="form-label">City</label>
               <input type="text" className="form-control" id="city" defaultValue="Ho Chi Minh" onChange={handleChange} />
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Confirm Order (${totalAmount})
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillingForm;