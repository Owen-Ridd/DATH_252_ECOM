import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { Navbar, Footer } from "../../../components";
import { Link } from "react-router-dom";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      const fetchMyOrders = async () => {
        setLoading(true);
        try {
          const { data } = await axiosClient.get(`/orders/mine?email=${user.email}`);
          setOrders(data);
        } catch (error) {
          console.error("Lỗi tải lịch sử:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMyOrders();
    }
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center" style={{ marginTop: "100px", minHeight: "60vh" }}>
            <h3>Please login to view your orders.</h3>
            <Link to="/login" className="btn btn-dark mt-3">Login Now</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container py-5" style={{ marginTop: "80px", minHeight: "80vh" }}>
        <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>My Orders</h2>
        
        {loading ? <p>Loading...</p> : (
          orders.length > 0 ? (
            <div className="row">
                {orders.map(order => (
                    <div key={order._id} className="col-12 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                                <div>
                                    <span className="fw-bold me-3">Order #{order._id.slice(-6).toUpperCase()}</span>
                                    <span className="text-muted small">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className={`badge rounded-pill px-3 py-2 ${
                                    order.status === 'Delivered' ? 'bg-success' : 
                                    order.status === 'Pending' ? 'bg-warning text-dark' : 'bg-primary'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="card-body">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="d-flex align-items-center mb-3">
                                        <img src={item.image} alt={item.product_title} style={{width: "60px", height: "60px", objectFit: "cover"}} className="rounded bg-light me-3"/>
                                        <div>
                                            <h6 className="mb-0">{item.product_title}</h6>
                                            <small className="text-muted">{item.qty} x ${item.price}</small>
                                        </div>
                                        <div className="ms-auto fw-bold">${item.price * item.qty}</div>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span className="fw-bold">Total Amount</span>
                                    <span className="fs-5 fw-bold text-success">${order.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-5">
                <p className="text-muted">You haven't placed any orders yet.</p>
                <Link to="/products" className="btn btn-outline-dark">Start Shopping</Link>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default OrderHistoryPage;