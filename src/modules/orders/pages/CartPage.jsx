import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCart, delCart, removeOne } from "../store/cartSlice"; 
import { Navbar, Footer } from "../../../components"; 
import toast from "react-hot-toast";

const CartPage = () => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]); // Chứa các _id được chọn

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id)); 
    } else {
      setSelectedItems([...selectedItems, id]); 
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === state.length) {
      setSelectedItems([]); 
    } else {
      setSelectedItems(state.map(item => item._id));
    }
  };

  const checkoutItems = state.filter(item => selectedItems.includes(item._id));
  
  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = checkoutItems.length > 0 ? 30.0 : 0; 
  const total = subtotal + shipping;

  const addItem = (product) => dispatch(addCart(product));
  const removeOneItem = (product) => dispatch(removeOne(product));
  const removeItem = (product) => dispatch(delCart(product));

  const handleCheckout = () => {
    if (checkoutItems.length === 0) return toast.error("Please select at least one item to checkout");
    
    navigate("/checkout", { state: { checkoutItems, total, subtotal } });
  };

  const EmptyCart = () => (
    <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{minHeight: "60vh"}}>
      <div className="mb-4 text-muted opacity-50"><i className="fa fa-shopping-bag display-1"></i></div>
      <h2 className="mb-3" style={{fontFamily: "'Playfair Display', serif"}}>Your Bag is Empty</h2>
      <Link to="/product" className="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold" style={{letterSpacing: "2px", fontSize: "0.85rem"}}>Start Designing</Link>
    </div>
  );

  const ShowCart = () => (
    <div className="container py-5">
      <div className="row mb-5">
          <div className="col-12 text-center">
              <h2 className="display-5" style={{fontFamily: "'Playfair Display', serif"}}>Shopping Bag</h2>
              <p className="text-muted">{state.length} items in total</p>
          </div>
      </div>
      
      <div className="row g-5">
        {/* --- LIST SẢN PHẨM --- */}
        <div className="col-lg-8">
          
          <div className="d-flex align-items-center mb-3 border-bottom pb-2">
              <input 
                type="checkbox" 
                className="form-check-input me-3 border-dark rounded-0" 
                style={{width: "20px", height: "20px", cursor: "pointer"}}
                checked={selectedItems.length === state.length && state.length > 0}
                onChange={handleSelectAll}
              />
              <span className="fw-bold small text-uppercase">Select All ({state.length})</span>
          </div>

          {state.map((item) => (
            <div key={item._id} className={`row align-items-center border-bottom py-4 transition-all ${selectedItems.includes(item._id) ? "bg-white" : "opacity-75"}`}>
              
              <div className="col-1">
                  <input 
                    type="checkbox" 
                    className="form-check-input border-dark rounded-0" 
                    style={{width: "20px", height: "20px", cursor: "pointer"}}
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleSelect(item._id)}
                  />
              </div>

              <div className="col-md-5 d-flex align-items-center mb-3 mb-md-0">
                <div className="flex-shrink-0 position-relative" style={{width: "80px", height: "80px", backgroundColor: "#f9f9f9"}}>
                    <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover mix-blend-multiply" />
                </div>
                <div className="ms-3">
                    <h6 className="mb-1 text-uppercase fw-bold" style={{fontSize: "0.85rem", letterSpacing: "1px"}}>{item.title}</h6>
                    <p className="mb-0 text-muted small">${item.price}</p>
                    <p className="mb-0 text-muted small fst-italic">{item.selectedFabric}</p>
                </div>
              </div>

              <div className="col-md-3 col-6 d-flex justify-content-center align-items-center">
                  <div className="d-flex border align-items-center">
                    <button className="btn btn-link text-dark px-2 text-decoration-none" onClick={() => removeOneItem(item)} disabled={item.qty === 1}><i className="fas fa-minus small"></i></button>
                    <div className="px-2 fw-bold small">{item.qty}</div>
                    <button className="btn btn-link text-dark px-2 text-decoration-none" onClick={() => addItem(item)}><i className="fas fa-plus small"></i></button>
                  </div>
              </div>

              <div className="col-md-3 col-5 text-end d-flex align-items-center justify-content-end gap-3">
                  <p className="mb-0 fw-bold">${(item.qty * item.price).toLocaleString()}</p>
                  <button className="btn text-muted p-0" onClick={() => removeItem(item)}><i className="fa fa-times"></i></button>
              </div>
            </div>
          ))}
        </div>

        {/* --- ORDER SUMMARY --- */}
        <div className="col-lg-4">
          <div className="p-4 bg-light h-100 sticky-top" style={{top: "100px"}}>
              <h5 className="mb-4 fw-bold" style={{fontFamily: "'Playfair Display', serif"}}>Summary</h5>
              
              <ul className="list-unstyled mb-4">
                <li className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Selected Items</span>
                    <span>{checkoutItems.length}</span>
                </li>
                <li className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                </li>
                <li className="d-flex justify-content-between mb-3 small text-muted">
                    <span>Shipping Estimate</span>
                    <span>${shipping.toLocaleString()}</span>
                </li>
                <li className="border-top my-3"></li>
                <li className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                </li>
              </ul>

              <button 
                onClick={handleCheckout} 
                className={`btn w-100 rounded-0 py-3 text-uppercase fw-bold ${checkoutItems.length > 0 ? "btn-dark" : "btn-secondary disabled"}`}
                style={{letterSpacing: "2px"}}
              >
                  Checkout ({checkoutItems.length})
              </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={{backgroundColor: "#fff", minHeight: "100vh", marginTop: "80px"}}>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default CartPage;