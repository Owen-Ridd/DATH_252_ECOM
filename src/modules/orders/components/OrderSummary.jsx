import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({ subtotal, shipping, total, showCheckoutBtn = true }) => {
  return (
    <div className="p-4" style={{backgroundColor: "#F9F9F9"}}>
        <h5 className="mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Order Summary</h5>
        <ul className="list-unstyled mb-4">
          <li className="d-flex justify-content-between mb-2 small text-muted">
            <span>Subtotal</span>
            <span>${subtotal}</span> 
          </li>
          <li className="d-flex justify-content-between mb-3 small text-muted">
            <span>Shipping Estimate</span>
            <span>${shipping}</span>
          </li>
          <li className="border-top my-3"></li>
          <li className="d-flex justify-content-between align-items-center">
            <span className="fw-bold text-uppercase" style={{letterSpacing: "1px"}}>Total</span>
            <span className="fs-4 fw-bold" style={{fontFamily: "'Playfair Display', serif"}}>${total}</span>
          </li>
        </ul>
        
        {showCheckoutBtn && (
            <Link to="/checkout" className="btn btn-dark w-100 rounded-0 py-3 text-uppercase fw-bold" style={{letterSpacing: "2px", fontSize: "0.85rem"}}>
            Proceed to Checkout
            </Link>
        )}

        <div className="mt-4 text-center">
             <p className="small text-muted mb-2"><i className="fa fa-lock me-1"></i> Secure Checkout</p>
             <div className="opacity-50">
                <i className="fa-brands fa-cc-visa mx-1 fs-4"></i>
                <i className="fa-brands fa-cc-mastercard mx-1 fs-4"></i>
                <i className="fa-brands fa-cc-amex mx-1 fs-4"></i>
             </div>
        </div>
    </div>
  );
};

export default OrderSummary;