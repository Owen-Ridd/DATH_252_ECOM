import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const pageStyle = {
    backgroundColor: "#FFFCFC",
    minHeight: "100vh",
    marginTop: "80px"
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const EmptyCart = () => {
    return (
      <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{minHeight: "60vh"}}>
        <div className="mb-4 text-muted opacity-50">
            <i className="fa fa-shopping-bag display-1"></i>
        </div>
        <h2 className="mb-3" style={{fontFamily: "'Playfair Display', serif"}}>Your Bag is Empty</h2>
        <p className="text-muted mb-5">Looks like you haven't added any pieces to your collection yet.</p>
        <Link to="/products" className="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold" style={{letterSpacing: "2px", fontSize: "0.85rem"}}>
           Start Designing
        </Link>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-5">
             <h2 className="display-5 text-center" style={{fontFamily: "'Playfair Display', serif"}}>Your Shopping Bag</h2>
             <p className="text-center text-muted small text-uppercase" style={{letterSpacing: "2px"}}>{totalItems} Items</p>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="d-none d-md-flex justify-content-between border-bottom pb-3 mb-4 text-uppercase small text-muted" style={{letterSpacing: "1px"}}>
                <span style={{width: "50%"}}>Product</span>
                <span style={{width: "20%"}} className="text-center">Quantity</span>
                <span style={{width: "20%"}} className="text-end">Total</span>
                <span style={{width: "10%"}}></span>
            </div>
            {state.map((item) => {
              return (
                <div key={item.id} className="row align-items-center border-bottom py-4">
                  <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                    <div className="flex-shrink-0" style={{width: "100px", height: "100px", backgroundColor: "#f0f0f0"}}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-100 h-100 object-fit-cover mix-blend-multiply"
                        />
                    </div>
                    <div className="ms-4">
                        <h6 className="mb-1 text-uppercase small text-muted" style={{fontSize: "0.7rem", letterSpacing: "1px"}}>{item.category}</h6>
                        <h5 className="mb-2" style={{fontFamily: "'Playfair Display', serif"}}>{item.title}</h5>
                        <p className="mb-0 text-muted small">${item.price}</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 d-flex justify-content-md-center align-items-center">
                      <div className="d-flex border">
                        <button className="btn btn-link text-dark text-decoration-none px-2" onClick={() => removeItem(item)} disabled={item.qty === 1}>
                            <i className="fas fa-minus small"></i>
                        </button>
                        <div className="px-2 d-flex align-items-center justify-content-center" style={{minWidth: "30px", fontSize: "0.9rem"}}>
                            {item.qty}
                        </div>
                        <button className="btn btn-link text-dark text-decoration-none px-2" onClick={() => addItem(item)}>
                            <i className="fas fa-plus small"></i>
                        </button>
                      </div>
                  </div>
                  <div className="col-md-2 col-5 text-end">
                      <p className="mb-0 fw-bold">${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                  <div className="col-md-1 col-1 text-end">
                       <button className="btn text-muted hover-danger p-0" onClick={() => removeItem(item)} title="Remove Item">
                          <i className="fa fa-times"></i>
                       </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-5">
                <Link to="/products" className="text-dark text-decoration-none small text-uppercase fw-bold" style={{letterSpacing: "1px"}}>
                    <i className="fa fa-arrow-left me-2"></i> Continue Shopping
                </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="p-4" style={{backgroundColor: "#F9F9F9"}}>
                <h5 className="mb-4" style={{fontFamily: "'Playfair Display', serif"}}>Order Summary</h5>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </li>
                  <li className="d-flex justify-content-between mb-3 small text-muted">
                    <span>Shipping Estimate</span>
                    <span>${shipping.toFixed(2)}</span>
                  </li>
                  <li className="border-top my-3"></li>
                  <li className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-uppercase" style={{letterSpacing: "1px"}}>Total</span>
                    <span className="fs-4 fw-bold" style={{fontFamily: "'Playfair Display', serif"}}>${(subtotal + shipping).toFixed(2)}</span>
                  </li>
                </ul>
                <Link to="/checkout" className="btn btn-dark w-100 rounded-0 py-3 text-uppercase fw-bold" style={{letterSpacing: "2px", fontSize: "0.85rem"}}>
                  Proceed to Checkout
                </Link>
                <div className="mt-4 text-center">
                     <p className="small text-muted mb-2"><i className="fa fa-lock me-1"></i> Secure Checkout</p>
                     <div className="opacity-50">
                        <i className="fa-brands fa-cc-visa mx-1 fs-4"></i>
                        <i className="fa-brands fa-cc-mastercard mx-1 fs-4"></i>
                        <i className="fa-brands fa-cc-amex mx-1 fs-4"></i>
                     </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
      <style jsx>{`
        .mix-blend-multiply { mix-blend-mode: multiply; }
        .hover-danger:hover { color: #dc3545 !important; }
      `}</style>
    </>
  );
};

export default Cart;