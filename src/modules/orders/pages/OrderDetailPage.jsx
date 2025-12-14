import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar, Footer } from "../../../components";
import axiosClient from "../../../api/axiosClient";
import SkeletonLoading from "../../products/components/SkeletonLoading";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axiosClient.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <SkeletonLoading />;
  if (!order) return <div className="text-center py-5">Order not found</div>;

  const steps = ["Pending", "Processing", "Shipping", "Delivered"];
  const currentStep = steps.indexOf(order.status) === -1 ? 0 : steps.indexOf(order.status);
  
  const isCancelled = order.status === "Cancelled";

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px", fontFamily: "Helvetica, Arial, sans-serif" }}>
        
        <div className="container">
            {/* BREADCRUMB & HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <Link to="/profile" className="text-muted small text-decoration-none text-uppercase fw-bold"><i className="fa fa-arrow-left me-2"></i> Back to Orders</Link>
                    <h2 className="mt-3 display-6" style={{fontFamily: "'Playfair Display', serif"}}>Order #{order._id.slice(-6).toUpperCase()}</h2>
                    <p className="text-muted small">Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
                {isCancelled && <span className="badge bg-danger fs-6 px-3 py-2">CANCELLED</span>}
            </div>

            {/* PROGRESS TRACKER (TRACKING BAR) */}
            {!isCancelled && (
                <div className="card border-0 shadow-sm p-5 mb-5">
                    <div className="position-relative d-flex justify-content-between">
                        <div className="position-absolute top-50 start-0 w-100 bg-light" style={{height: "4px", zIndex: 0}}></div>
                        <div 
                            className="position-absolute top-50 start-0 bg-dark transition-all" 
                            style={{height: "4px", zIndex: 0, width: `${(currentStep / (steps.length - 1)) * 100}%`, transition: "width 1s ease"}}
                        ></div>

                        {steps.map((step, index) => {
                            const active = index <= currentStep;
                            return (
                                <div key={step} className="position-relative z-1 text-center" style={{width: "100px"}}>
                                    <div 
                                        className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 fw-bold transition-all ${active ? "bg-dark text-white" : "bg-light text-muted border"}`}
                                        style={{width: "40px", height: "40px", fontSize: "0.8rem"}}
                                    >
                                        {index + 1}
                                    </div>
                                    <span className={`small fw-bold text-uppercase ${active ? "text-dark" : "text-muted"}`} style={{fontSize: "0.7rem", letterSpacing: "1px"}}>{step}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white py-3">
                            <h6 className="m-0 fw-bold text-uppercase small" style={{letterSpacing: "1px"}}>Items Ordered</h6>
                        </div>
                        <div className="card-body p-0">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="d-flex p-4 border-bottom last:border-0 align-items-center">
                                    <div className="border bg-light p-1 rounded" style={{width: "80px", height: "80px"}}>
                                        <img src={item.image} alt="" className="w-100 h-100 object-fit-contain mix-blend-multiply" />
                                    </div>
                                    <div className="ms-4 flex-grow-1">
                                        <h6 className="fw-bold mb-1">{item.product_title}</h6>
                                        <p className="text-muted small mb-0">Fabric: {item.selectedFabric || "Standard"}</p>
                                        <p className="text-muted small mb-0">Qty: {item.qty}</p>
                                    </div>
                                    <div className="fw-bold">${item.price.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer bg-light p-4">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Subtotal</span>
                                <span className="fw-bold">${order.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Shipping</span>
                                <span className="fw-bold">Free</span>
                            </div>
                            <div className="d-flex justify-content-between border-top border-secondary border-opacity-25 pt-3 mt-3">
                                <span className="fw-bold fs-5">Total</span>
                                <span className="fw-bold fs-5">${order.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="mt-3 p-3 bg-white border border-warning rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="small fw-bold text-uppercase text-muted">Payment Status</span>
                                    <span className={`badge rounded-0 text-uppercase ${order.paymentOption === 'deposit' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                        {order.paymentOption === 'deposit' ? '25% Deposit Paid' : 'Fully Paid'}
                                    </span>
                                </div>
                                {order.paymentOption === 'deposit' && (
                                    <small className="d-block mt-2 text-muted">
                                        * Remaining balance: <strong>${(order.totalAmount * 0.75).toLocaleString()}</strong> due before delivery.
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-uppercase small mb-3 text-muted">Shipping Address</h6>
                            <p className="mb-1 fw-bold">{order.customer.name}</p>
                            <p className="mb-1">{order.customer.address}</p>
                            <p className="mb-1">{order.customer.city}, {order.customer.state} {order.customer.zip}</p>
                            <p className="mb-0 text-muted small mt-2">{order.customer.phone}</p>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm bg-dark text-white">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-uppercase small mb-3 text-white-50">Need Help?</h6>
                            <p className="small mb-4 opacity-75">If you have questions about your order status or need to make changes, please contact us.</p>
                            <button className="btn btn-outline-light w-100 rounded-0 text-uppercase fw-bold small">Contact Support</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        .mix-blend-multiply { mix-blend-mode: multiply; }
        .transition-all { transition: all 0.5s ease; }
      `}</style>
    </>
  );
};

export default OrderDetailPage;